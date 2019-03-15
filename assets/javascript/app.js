$(document).ready(function() {
  var animals = ["cat", "dog", "snake", "lion", "tiger", "pengiun"];

  var gifStill = false;

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
    $(".animalInput").val("");
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
      "&limit=12&accept=images";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
        if (response.data.length === 0) {
          for (var i = 0; i < animals.length; i++) {
            if (animal === animals[i]) {
              animals.splice(i, 1);
              renderButton();
            }
          }
        } else {
          for (var i = 0; i < response.data.length; i++) {
            var animalDiv = $("<div class>");
            animalDiv.attr("arrayNo:", i);
            animalDiv.attr("q", animal);

            animalDiv.addClass(
              "my-2 gifClick borders height p-2 d-flex flex-column align-items-center"
            );

            var animalName = $("<h4 class='text-center'>");
            animalName.text(response.data[i].title);

            var animalImage = $("<img class='image my-2 sizing'>");
            animalImage.attr(
              "src",
              response.data[arrayNumber].images.downsized_medium.url
            );

            gifStill = true;

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
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  $(document).on("click", ".gifClick", function() {
    var arrayNumber = $(this).attr("arrayNo");
    console.log(arrayNumber);
    var animalName = $(this).attr("q");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" +
      animalName +
      "&limit=12&accept=images";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var an = $(".image");
      if (gifStill === true) {
        an.attr("src", response.data[arrayNumber].images.downsized_medium.url);
      } else {
        an.attr("src", response.data[arrayNumber].images["480w_still"].url);
      }
    });
  });

  renderButton();
});
