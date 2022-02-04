const axios = require("axios")
const Bugsnag = require("./modules/bugsnag")
const urlsToFetch = require("./data/urls")

const fetchInterval = 60000

const fetchUrlRecursively = async (url) => {
    axios.get(url).catch((error) => {
        Bugsnag.handle(url, error)
    })
    setTimeout(()=>{
        fetchUrlRecursively(url)
    }, fetchInterval)
}

urlsToFetch.forEach((url) => fetchUrlRecursively(url))

console.log("service worker started.")
console.log(
    `${urlsToFetch.length} url will be fetched every ${fetchInterval}ms.`
)