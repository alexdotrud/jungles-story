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
mainPage();
gameSteps();
}); 

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
$("#popupModal").click(function(e) {
    if ($(e.target).is("popupModal")) {
    $("#popupModal").fadeOut();
}});

// Choices Generator 
function generateChoices(data) {
    let html = `<p>${data["choices-question"]}</p>`;
    for (let i = 0; i < data.choices.length; i++) {
    html += `<button class="btn btn-choice  ${i + 1}" title="Every choice can change the story..."> ${data.choices[i].choice} </button> `;
    }
    return html;
};

// Restart Button
function restartGame() {
    $(".dialogue").html(`
    <dialog id="restart" open>
    <p>Are you sure you want to restart the Game?</p>
    <form method="dialog">
    <button class="ok-no" value="yes">OK</button>
    <button class="ok-no" value="no">NO</button>
    </form>
    </dialog>`);
    $(".ok-no").click(function() {
        const buttonValue = $(this).val();
        if (buttonValue === "yes") {
            mainPage();
            $(".dialogue").empty();
        } else  {
        $(".dialogue").empty();
        };
    })
    };

// Game Steps
function gameSteps() {
    $(document).on("click", ".meet-characters", showCharacters);
    $(document).on("click", ".start-story", showChapter1);
    $(document).on("click", ".btn-choice", function() {
        const chapter = $(".story-heading").text();
        let index = 0;
    if($(this).hasClass("1")) {
        index = 0;
    } else if($(this).hasClass("2")) {
        index = 1;
    } else if($(this).hasClass("3")) {
        index = 2;
    }
    if (chapter === "Chapter 1") {
    showChapter2(index);
    } else if (chapter === "Chapter 3") { 
    showChapter4(index); 
    } else if (chapter === "Chapter 5") {
        showChapter6(index);
    }
});
    $(document).on("click", ".cnt-btn", showChapter3);
    $(document).on("click", ".cnt-btn2", showChapter5);
    $(document).on("click", ".cnt-btn3", showChapter7);
    $(document).on("click", ".btn-choice", function() {
        const chapter = $(".story-heading").text();
        let index = 0;
    if($(this).hasClass("1")) {
        index = 0;
    } else if($(this).hasClass("2")) {
        index = 1;
    } else if($(this).hasClass("3")) {
        index = 0;
    }
    if (chapter === "Chapter 7") {
    showChapter8(index);
    };
});
    $(document).on("click", ".btn-restart", restartGame);
};

// Main Page
function mainPage() {
    const data = storyData.main;

    $(".story-heading").text(data.heading);
    $(".intro").html(data.intro);
    $("#choices-container").html(` <button class="btn btn-intro meet-characters">Meet the Characters!</button>`);
    $("#pictures-container").hide();
};

//  Meeting Characters Chapter
function showCharacters() {
    const data = storyData.characters;

    $(".story-heading").text(data.heading);
    $(".intro").text(data.intro);
    $("#pictures-container").show();
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
};

// Chapter 1
function showChapter1() {
    const data = storyData.chapter1;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story);
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
};

// Chapter 2
function showChapter2(index) {
    const data = storyData.chapter2;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story[index].story);
    $(".start-story").hide();
    $("#choices-container").html(`<button class="btn cnt-btn">Continue...</button>`);
};

// Chapter 3
function showChapter3() {
    const data = storyData.chapter3;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story);
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
};

//Chapter 4 
function showChapter4(index) {
    const data = storyData.chapter4;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story[index].story);
    $(".start-story").hide();
    $("#choices-container").html(`<button class="btn cnt-btn2">Continue...</button>`);
};

// Chapter 5
function showChapter5() {
    const data = storyData.chapter5;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story);
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
};

// Chapter 6
function showChapter6(index) {
    const data = storyData.chapter6;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story[index].story);
    $(".start-story").hide();
    $("#choices-container").html(`<button class="btn cnt-btn3">Continue...</button>`);
};

//Chapter 7
function showChapter7() {
    const data = storyData.chapter7;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story);
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
};

// Chapter 8
function showChapter8(index) {
    const data = storyData.chapter8;
    $(".story-heading").text(data.heading);
    $("#pictures-container").hide();
    $(".intro").html(data.story[index].story);
    $(".start-story").hide();
    $("#choices-container").html(`<button class="btn btn-restart">The End</button>`);
};