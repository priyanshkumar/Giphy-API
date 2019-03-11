$(document).ready(function() {
  var animals = ["cat", "dog", "snake", "lion", "tiger", "pengiun"];

  function renderButton() {
    $(".buttons").empty();

    for (var i = 0; i < animals.length; i++) {
      var a = $("<button>");

      a.addClass("animal");

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

  console.log("hiiiiii");
  renderButton();
});
