$(document).ready(function () {
  function showCharacters() {
      $(".story-heading").text("Meet the Explorers");

      $(".intro").hide();
      $(".btn-intro").hide();

      $("#pictures-container").html(`
          <img src="assets/images/aurora.png" class="characters-img" alt="Picture of Aurora">
          <img src="assets/images/rick.png" class="characters-img" alt="Picture of Rick">
          <img src="assets/images/dog.png" class="characters-img" alt="Picture of Dog">
      `);

      $("#choices-container").html(`<button class="btn btn-start-story">Start The Story</button>`);
  }

  $(".meet-characters").click(showCharacters);
});