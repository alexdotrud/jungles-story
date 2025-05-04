// Statements
const heading = document.querySelector(".story-heading");
const intro = document.querySelector(".intro");
const btnIntro = document.querySelector(".btn-intro");
const picturesContainer = document.querySelector("#pictures-container");
const choicesContainer = document.querySelector("#choices-container");
const text = document.querySelector("#story-container");

// Dog Bark
const dogBark = new Audio("assets/audio/bark-sound.mp3");

// Typing Effect
function typeWriter(element, text, speed = 50, callback) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Fetch Story Data
let storyData = null;
fetch("assets/js/story.json")
.then(response => response.json())
.then(data => {
storyData = data;
gameSteps();
}); 

// Game Steps
function gameSteps() {
if ($(".story-heading").text() === "Welcome to Jungle of Whispers!") {
$(".meet-characters").click(showCharacters);
};
};

//  Meeting Characters Chapter
$(document).ready(function() {
function showCharacters() {
    const data = storyDate.characters;

    $(".story-heading").text(data.heading);

    $(".intro").hide();
    $(".btn-intro").hide();

    $("#pictures-container").html(`
        <img src="assets/images/aurora.png" class="characters-img" alt="Aurora" id="auroraImage">
        <img src="assets/images/rick.png" class="characters-img" alt="Rick" id="rickImage">
        <img src="assets/images/dog.png" class="characters-img" alt="Dog" id="dogImage">

    $("#choices-container").html(`<button class="btn btn-start-story">Start The Story</button>`);

        <div id="popupModal" class="modal">
            <div class="modal-content">
                <span class="close"></span>
                <p id="modalContent"></p>
            </div>
        </div>
    `);

// Pop-Up's on images
$('.characters-img').click(function() {
    const description = $(this).data('description');
    const alt = $(this).attr('alt');
    if (alt === 'Dog') {
        dogBark.play();
    }
    $('#modalContent').text(description);
    $('#popupModal').fadeIn();
});
// Chapter 1
}});
