/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 /* eslint-env $ */

$(document).ready(function(){
  // create a text node  to handle cross side scripting attack and use this function in any template
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  function createTweetElement(tweet) {
    const calDate = timeago.format(tweet.created_at);
    const newTweet = `
        <article class="tweet">
        <header class="tweet--header">
          <image src=${
            tweet.user.avatars
          } alt="tweeter-User-Image" class="tweet--avatar"></image>
          <h2 class="tweet--name">${tweet.user.name}</h2>
          <time class ="tweet--handle">${tweet.user.handle}</time>
        </header>
        <div class="tweet-body">
          <p>${escape(tweet.content.text)}</p>
        </div>
       
        <footer class="tweet--footer">
        <small class="footer--age">${calDate} <small>
          <span class="footer--actions">
            <a href="#"><i class="fa fa-flag"></i></a>
            <a href="#"><i class="fa fa-retweet"></i></a>
            <a href="#"><i class="fa fa-heart"></i></a>'
          </span>
        </small></small>
        </footer>
      </article>
        `;
    return newTweet;
  }
  const renderTweets = function (tweets) {
    tweets.forEach(function (tweet) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    });
  };

  const loadTweets = function () {
    $.get("./tweets", function (data) {
      const dataReversed = data.reverse();
      renderTweets(dataReversed);
    });
  };

  // load the tweets
  loadTweets();
  /*  form submission using jQuery */
  $("#formTweet").submit(function (event) {
    let maxTweetVal = 140;
    let tweet = $("#form__textarea").val().length;
    let tweetError = false;
    if (tweet == "" || tweet == null) {
      tweetError = true;
      $("#newtweet__empty").slideDown("slow");
      $("#newtweet__maxerror").slideUp("slow");
    }
    if (tweet > maxTweetVal) {
      tweetError = true;
      $("#newtweet__maxerror").slideDown("slow");
      $("#newtweet__empty").slideUp("slow");
    }
    if (!tweetError) {
      var formValues = $(this).serialize();
      $("#newtweet__maxerror").slideUp("slow");
      $("#newtweet__empty").slideUp("slow");
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets",
        data: formValues,
      }).then(function () {
        $.get("./tweets").then(function (data) {
          $("#form__textarea").val("");
          const index = data.length - 1;
          const $tweet = createTweetElement(data[index]);
          $("#tweets-container").prepend($tweet);
        });
      });
    }
    event.preventDefault();
  });
});

  