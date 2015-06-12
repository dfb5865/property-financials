var phantom = require('phantom');

phantom.create(function (ph) {
  ph.createPage(function (page) {
    page.open("http://www.zillow.com/homedetails/4027-Ariel-Ave-Toledo-OH-43623/34712532_zpid/", function (status) {

      console.log("opened http://www.zillow.com/homedetails/4027-Ariel-Ave-Toledo-OH-43623/34712532_zpid/? ", status);

      page.evaluate(function () {
        return document;
      },
      function (result) {
        console.log(result);
        ph.exit();
      });

    });
  });
});
