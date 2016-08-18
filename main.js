
var idName = new Array(
"home",
  "web-news",
  "programming",
  "design"
);


var siteArray = new Array(idName.length);


siteArray[0] = new Array(
  "http://www.reddit.com/.rss"
);


siteArray[1] = new Array(
  "https://www.reddit.com/r/programming/.rss"
);

siteArray[2] = new Array(
  "https://www.reddit.com/r/web_design/.rss"
);

siteArray[3] = new Array(
  "https://www.reddit.com/r/design/.rss"
);

google.load("feeds", "1");

function initialize() {
  for (var i = 0; i < idName.length; i++) {

    var container = document.getElementById(idName[i]);

    for (var j = 0; j < siteArray[i].length; j++) {
      var feed = new google.feeds.Feed(siteArray[i][j]);
      feed.setNumEntries(12);
      feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);

      feed.load(function(result) {
        if (!result.error) {

          var siteSection = document.createElement("section");
          var siteH1 = document.createElement("h1");
          var siteA = document.createElement("a");
          var siteUl = document.createElement("ul");
          siteA.href = result.feed.link;
          siteA.appendChild(document.createTextNode(result.feed.title));
          siteH1.appendChild(siteA);
          siteSection.appendChild(siteH1);
          if (result.feed.entries.length) {
            for (var i = 0; i < result.feed.entries.length; i++) {
              var entry = result.feed.entries[i];
              // Exclude "PR" feed
              if (!entry.title.match("PR:")) {
                var dateColor = "";
                var date = new Date(entry.publishedDate);
                var currentDate = new Date();

                var elapsedTime = (currentDate.getTime() - date.getTime())/1000;
                elapsedTime = Math.ceil(elapsedTime);
                var feedDate = null;
                if (elapsedTime < 60) {
                  feedDate = 'just now';
                  dateColor = "#e74c3c";
                } else if (elapsedTime < 120) {
                  feedDate = '1 min before';
                  dateColor = "#e74c3c";
                } else if (elapsedTime < (60*60)) {
                  feedDate = Math.floor(elapsedTime / 60) + ' mins before';
                  dateColor = "#e74c3c";
                } else if (elapsedTime < (120*60)) {
                  feedDate = '1 hour ago';
                  dateColor = "#e74c3c";
                } else if (elapsedTime < (24*60*60)) {
                  feedDate = Math.floor(elapsedTime / 3600) + ' hours ago';
                  dateColor = "#e74c3c";
                } else if (elapsedTime < (48*60*60)) {
                  feedDate = '1 day ago';
                  dateColor = "#1abc9c";
                } else if (elapsedTime < (7*24*60*60)) {
                  feedDate = Math.floor(elapsedTime / 86400) + ' days ago';
                  dateColor = "#1abc9c";
                } else if (elapsedTime < (14*24*60*60)) {
                  feedDate = '1 week ago';
                  dateColor = "#3498db";

                } else {
                  feedDate = Math.floor(elapsedTime / 604800) + ' weeks ago';
                  dateColor = "#3498db";
                }

                var feedLi = document.createElement("li");
                feedLi.style.borderColor = dateColor;
                var feedA = document.createElement("a");
                feedA.href = feedA.title = entry.link;
                var feedTitle = document.createElement("span");
                feedTitle.className = "entryTitle scrambled-writer";
                feedTitle.appendChild(document.createTextNode(entry.title));
                var feedPublishedDate = document.createElement("span");
                feedPublishedDate.className = "entryDate scrambled-writer";
                feedPublishedDate.style.color = dateColor;
                feedPublishedDate.appendChild(document.createTextNode(feedDate));
                var feedSnippet = document.createElement("span");

                feedA.appendChild(feedTitle);
                feedA.appendChild(feedPublishedDate);
                feedA.appendChild(feedSnippet);
                feedLi.appendChild(feedA);
                siteUl.appendChild(feedLi);
              }
            }
          }
        } else {
          siteA.href = siteA.title = result.feed.link;
          siteA.appendChild(document.createTextNode(result.feed.title));
          siteH1.appendChild(siteA);
          siteH1.appendChild(document.createTextNode("failed to load"));
          siteSection.appendChild(siteH1);
        }
        siteSection.appendChild(siteUl);
        container.appendChild(siteSection);
      });
    }
  }
} 

google.setOnLoadCallback(initialize);
