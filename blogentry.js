(function() {
    var DateParser = require('date-and-time');
    var UrlSafeString = require('url-safe-string');

    module.exports.create = function(blogFileName, title, summary) {
        var tagGenerator = new UrlSafeString();

        var id = blogFileName.substring(0, 8);
        var date = getDateFromId(id);

        return {
            id: +id,
            year: date.getFullYear(),
            date: DateParser.format(date, 'MMMM D, YYYY'),
            urlId: tagGenerator.generate(title),
            title: title,
            summary: summary,
            content: ""
        };
    }

    module.exports.toString = function(blogEntry) {
        var blogEntryArray = [];

        blogEntryArray.push('{ id: ' + blogEntry.id);
        blogEntryArray.push('year: ' + blogEntry.year);
        blogEntryArray.push('date: "' + blogEntry.date + '"');
        blogEntryArray.push('urlId: "' + blogEntry.urlId + '"');
        blogEntryArray.push('title: "' + blogEntry.title + '"');
        blogEntryArray.push('summary: "' + blogEntry.summary + '"');
        blogEntryArray.push('content: "" }');

        return blogEntryArray.join(', ');
    }

    function getDateFromId(id) {
        var year = id.substring(0, 4);
        var month = parseInt(id.substring(4, 6)) - 1;
        var day = id.substring(6, 8);
        
        return new Date(year, month, day);
    }
}());