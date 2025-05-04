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
$(document).on("click", ".meet-characters", showCharacters);
$(document).on("click", ".start-story", showChapter1);
};

//  Meeting Characters Chapter
function showCharacters() {
    const data = storyData.characters;

    $(".story-heading").text(data.heading);

    $(".intro").text(data.intro);
    $(".btn-intro").hide();

    $("#pictures-container").html(`
        <div id="popupModal" class="modal">
            <div class="modal-content">
                <p id="modalContent"></p>
            </div>
        </div>
        <img src="assets/images/aurora.png" class="characters-img" alt="Aurora">
        <img src="assets/images/rick.png" class="characters-img" alt="Rick">
        <img src="assets/images/dog.png" class="characters-img" alt="Dog">
        `);

    $("#choices-container").html(`<button class="btn start-story">Start The Story</button>`);

// Pop-Up's on images
$(".characters-img").click(function() {
    let description;
    const alt = $(this).attr("alt");
    if (alt === "Aurora") {
        description = storyData.characters.images[0].description;
    } else if (alt === "Rick") {
        description = storyData.characters.images[1].description;
    } else if (alt === "Dog") {
        description = storyData.characters.images[2].description;
        dogBark.play();
    }
    $('#modalContent').text(description);
    $('#popupModal').fadeIn();
});

// Pop-Up's closing
$("#popupModal").click(function() {
    $("#popupModal").fadeOut();
});
};

// Choices Generator 
function generateChoices(data) {
    let html = `<p>${data["choices-question"]}</p>`;
    for (let i = 0; i < data.choices.length; i++) {
    html += `<button class="btn btn-choice" title="Every choice can change the story..."> ${data.choices[i].choice} </button> `;
    }
    return html;
}  

// Chapter 1
function showChapter1() {
    const data = storyData.chapter1;
    $(".story-heading").text("Chapter 1");
    $("#pictures-container").hide();
    $(".intro").text(data.story);
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
}

// Pop-Up on Buttons
