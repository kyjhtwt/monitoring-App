const { createClient } = require("@bugsnag/js")
const fs = require('fs')
const util = require("util")

const acceptStatuses = require("../data/accept.json")
const slackHook = require("./slackHook")


const bugsnagClient = createClient(process.env.BUGSNAG_KEY)
const waitTime = 7200000

class Bugsnag {
    static async handle(url, error) {   // this function checks the server status code of url and send message to Slack if the url returns error
        const status = error.response.status
        fs.readFileSync(__dirname + "/../data/occuredErrors.json", (data) =>{
            if (acceptStatuses[url] && acceptStatuses[url].includes(status)) {      // if the url is determinded to be ignored in data/accept.json, it execute return.
                return;
            }
                let parseData = JSON.parse(data)    // parse previous records of Errors to check the error time
                let currentTime = new Date().getTime();              
                let isSame = (element) => element == status;
                let indexOfError = parseData[url].status.findIndex(isSame); 
                let previousErrorTime = parseData[url].occuredTime[indexOfError]

                if( !( parseData[url].status.includes(status) && currentTime - previousErrorTime <= waitTime )){
                    // if the url doesn't includes the status or the interval of error time exceeds waitTime, execute the following states
                    bugsnagClient.notify(new Error(util.inspect(error)))
                    let errorMessage = `A status of ${status} have been returned by ${url}`
                    slackHook.send(errorMessage)            // send the error message thorugh slack

                    if(currentTime - previousErrorTime > waitTime){
                        // if the interval of current status's error time exceeds waitTime, update the time of parseData 
                        previousErrorTime = currentTime.getTime();  // update the error time of current url's status
                        fs.writeFileSync(__dirname + "/../data/occuredErrors.json", JSON.stringify(parseData))
                    }
                    else{
                        parseData[url].status.push(status); // if there is no same previous error status in the parseData, it adds the error status in parseData.
                        parseData[url].occuredTime.push(currentTime.getTime());
                        fs.writeFile(__dirname + "/../data/occuredErrors.json", JSON.stringify(parseData));
                    }
                }
        })
    }
}

module.exports = Bugsnag
