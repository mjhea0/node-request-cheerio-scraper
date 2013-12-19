// dependencies
var csv = require('csv');
var fs = require('fs');
var request=require("request");
var cheerio=require("cheerio");
var writeStream = fs.createWriteStream("file.csv");

// write headers to csv
writeStream.write('Title,' + 'URL' + '\n');

// perfrom request
request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    // console.log(html)
    // pass DOM to cheerio
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element){
      // select previous element
      var a = $(this).prev();
      // parse the link title
      var title = a.text();
      // parse the href attribute from the "a" element:
      var url = a.attr('href');

      // write data to csv
      writeStream.write(title + ',' + url + '\n');
      
      // data store in an object (for dumping to mongo)
      var scrapedData = {
        title: title,
        url: url
      };
      //console.log(scrapedData);
    });
    console.log("\nDONE!\n")
  }
});
