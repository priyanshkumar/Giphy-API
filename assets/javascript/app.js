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

    animals.push(userAnimal);

    renderButton();
  });

  $(document).on("click", ".animal", displayAnimals);

  function displayAnimals() {
    var animal = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" +
      animal +
      "&limit=12&rating=g";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  renderButton();
});
