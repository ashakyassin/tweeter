$(document).ready(function() {
    // --- our code goes here ---
    $(`#form__textarea`).on('keyup', function() {
      let tweetLength = $(this).val().length;
      let counter = $(`#form__counter`);
  
      if (tweetLength <= 140) {
        counter.text(140-tweetLength).css("color", "inherit")
      } else {
        console.log(`TOO LONG`);
        counter.text(`-${0+(tweetLength-140)}`).css("color", "red");
      }
    })
  });