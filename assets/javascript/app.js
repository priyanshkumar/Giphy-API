$(document).ready(function() {
  var animals = ["cat", "dog", "snake", "lion", "tiger", "pengiun"];

  function renderButton() {
    $(".buttons").empty();

    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");

      a.addClass("animal m-2 btn btn-small btn-primary");

      a.attr("data-name", animals[i]);

      a.text(animals[i]);

      $(".buttons").append(a);
    }
  }

  $(".add").on("click", function() {
    event.preventDefault();

    var userAnimal = $(".animalInput")
      .val()
      .trim();

    if (userAnimal !== "") {
      animals.push(userAnimal);

      renderButton();
    }
  });

  $(document).on("click", ".animal", displayAnimals);

  function displayAnimals() {
    $(".gifs1").empty();
    $(".gifs2").empty();
    $(".gifs3").empty();

    var animal = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" +
      animal +
      "&limit=12&rating=g&accept=images";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
        $(".gifs").append(animalImage);
        for (var i = 0; i < response.data.length; i++) {
          var animalDiv = $("<div>");
          animalDiv.addClass(
            "my-2 borders height p-2 d-flex flex-column align-items-center"
          );

          var animalName = $("<h4 class='text-center'>");
          animalName.text(response.data[i].title);

          var animalImage = $("<img class='my-2'>");
          animalImage.attr("src", response.data[i].images.downsized_medium);

          var animalRating = $("<h6>");
          animalRating.text("Rating: " + response.data[i].rating);

          animalDiv.append(animalName, animalImage, animalRating);

          if (i === 0 || i === 3 || i === 6 || i === 9) {
            $(".gifs1").append(animalDiv);
          }
          if (i === 1 || i === 4 || i === 7 || i === 10) {
            $(".gifs2").append(animalDiv);
          }
          if (i === 2 || i === 5 || i === 8 || i === 11) {
            $(".gifs3").append(animalDiv);
          }
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  renderButton();
});
