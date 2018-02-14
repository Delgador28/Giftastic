$( document ).ready(function() {

    var paradiseGifView = ["Fiji", "Maldives", "Ocean", "Palm Tree", "Honolulu"];

  function gifStuffDisplay() {
    var myGiphyAPIKey = "&api_key=x7edH3PEAj8tLsWWXZnUFClzMfdFlOav";
    var paradise = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + paradise + myGiphyAPIKey + "&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

        $("#paradiseGifView").html(" ");

      var i;

      
      //For loop to show 10 gifs
      for (var i = 0; i < response.data.length; i++) {

       
      var imgURL = response.data[i].images.original_still.url;
      var imgAction = response.data[i].images.original.url;

      var image = $("<img src='" + imgURL + "' class='img img-thumbnail' alt='" + paradise + "' data-state='still' data-still='" + imgURL + "' data-animate='" + imgAction + "'>");

      var paradiseDiv = $("<div>");

      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var p = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      paradiseDiv.append(p);

      // Append image
      paradiseDiv.append(image);

      $("#paradiseGifView").append(paradiseDiv);
    };

    $(".img").on("click", function() {
      var state = $(this).attr('data-state');
      if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } 

      else {
        
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      };
    });
  });

  };

  function renderButtons() {

   
    $("#buttonPlace").empty();

    for (var i = 0; i < paradiseGifView.length; i++) {

      var a = $("<button>");
      a.addClass("button");
      a.attr("data-name", paradiseGifView[i]);
     
      a.text(paradiseGifView[i]);
     
      $("#buttonPlace").append(a);
    };
  };


  $("#addGif").on("click", function(event) {
    event.preventDefault();

    var paradise = $("#gifInput").val().trim();

    paradiseGifView.push(paradise);

    renderButtons();
  });

  $(document).on("click", ".button", gifStuffDisplay);


  renderButtons();

});
