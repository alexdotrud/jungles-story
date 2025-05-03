// Statements
const heading = document.querySelector(".story-heading");
const intro = document.querySelector(".intro");
const btnIntro = document.querySelector(".btn-intro");
const picturesContainer = document.querySelector("#pictures-container");
const choicesContainer = document.querySelector("#choices-container");
const text = document.querySelector("#story-container");

// Typing Effect
function typeWriter(element, text, speed = 50, callback) {
  let i = 0;

  function type() {
      if (i < text.length) {
          $(element).append(text.charAt(i));
          i++;
          setTimeout(type, speed);
      } else if (callback) {
          callback();
      }
  }

  type();
}

$(document).ready(function() {
//  Meeting Characters Chapter
  function showCharacters() {
      $(".story-heading").text("Meet the Explorers");

      $(".intro").hide();
      $(".btn-intro").hide();

      $("#pictures-container").html(`
          <img src="assets/images/aurora.png" class="characters-img" alt="Aurora" id="auroraImage">
          <img src="assets/images/rick.png" class="characters-img" alt="Rick" id="rickImage">
          <img src="assets/images/dog.png" class="characters-img" alt="Dog" id="dogImage">

          <div id="popupModal" class="modal">
              <div class="modal-content">
                  <span class="close">&times;</span>
                  <p id="modalContent">Here is your message or content!</p>
              </div>
          </div>
      `);

      $("#choices-container").html(`<button class="btn btn-start-story">Start The Story</button>`);
// Pop-Up's on images
      $(".characters-img").click(function () {
          var imgAlt = $(this).attr("alt");
          var infoText = "";

          if (imgAlt === "Aurora") {
              infoText = "Aurora is a fearless young explorer driven by curiosity and a desire to uncover the world's hidden mysteries.";
          } else if (imgAlt === "Rick") {
              infoText = "Rick is Aurora’s loyal and adventurous best friend, always ready with his survival skills and a good sense of humor.";
          } else if (imgAlt === "Dog") {
              infoText = "Dog is Aurora’s faithful companion, whose sharp instincts and unwavering loyalty help guide and protect her on every adventure.";
          }

          $("#modalContent").text(infoText);
          $("#popupModal").fadeIn();
      });

      $(document).on("click", ".close", function () {
          $("#popupModal").fadeOut();
      });

      $(window).click(function (event) {
          if ($(event.target).is("#popupModal")) {
              $("#popupModal").fadeOut();
          }
      });
  }

  $(".meet-characters").click(showCharacters);

// Chapter 1



});
