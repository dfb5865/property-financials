// Count all of the links from the io.js build page
var jsdom = require("jsdom");
jsdom.defaultDocumentFeatures = {
    FetchExternalResources: ["script", "img", "css", "frame", "iframe", "link"]
    // ProcessExternalResources: ["script"]
};

jsdom.env(
  "http://www.zillow.com/homedetails/4027-Ariel-Ave-Toledo-OH-43623/34712532_zpid/",
  ["http://code.jquery.com/jquery.js"],
  function (errors, window) {
    console.log(errors);
    console.log("there have been", window.$("iframe").length, "io.js releases!");
  }
);
