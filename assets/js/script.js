// Statements
const heading = document.querySelector(".story-heading");
const storyText = document.querySelector(".story-text");
const btnIntro = document.querySelector(".btn-intro");
const picturesContainer = document.querySelector("#pictures-container");
const choicesContainer = document.querySelector("#choices-container");
const storyContainer = document.querySelector("#story-container");
let gameStarted = false;
let isTyping = false;
let skipRequested = false;

// Sounds
const dogBark = new Audio("assets/audio/bark-sound.mp3");
const junglesSound = new Audio("assets/audio/jungles-sound.mp3");
const windSound = new Audio("assets/audio/wind-sound.mp3");

// Typing Effect
function textTypingEffect(storyText, plainText, fullHtmlText, i = 0) {
    // Clears text
    if (i === 0) {
        storyText.textContent = "";
        if (storyText === document.querySelector(".story-text")) {
            $(choicesContainer).hide();
        }
    }
// If skip button clicked
    if (skipRequested) {
        storyText.innerHTML = fullHtmlText;
        isTyping = false;
        skipRequested = false;
        $(".skip-btn").hide();

        if (storyText === document.querySelector(".story-text")) {
            $(choicesContainer).fadeIn(550);
        }
        return;
    }
// Adds one letter
    storyText.textContent += plainText[i];

// If the last letter
    if (i === plainText.length - 1) {
        storyText.innerHTML = fullHtmlText;
        isTyping = false;
        $(".skip-btn").hide(); 

        if (storyText === document.querySelector(".story-text")) {
            $(choicesContainer).fadeIn(550);
        }
        return;
    }

    setTimeout(() => textTypingEffect(storyText, plainText, fullHtmlText, i + 1), 20);
};

// Apply Typing Effect
function applyTypingEffect(headingText, storyTextContent) {

// When Start the Game button clicked
    if (gameStarted) {
        isTyping = true;
        skipRequested = false;

// Removing HTML tags
        const headingPlainText = parseHtmlToPlainText(headingText);
        const storyPlainText = parseHtmlToPlainText(storyTextContent);

        textTypingEffect(heading, headingPlainText, headingText);

// Typing story text after delay
        setTimeout(() => {
            $(".skip-btn").show(); 
            textTypingEffect(storyText, storyPlainText, storyTextContent);
        }, 200);
    }
};

    // Html to Plain Text Transformer 
function htmlToText(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return temp.textContent || "";
    };

// Skip Typing
function skipTyping() {
    console.log("Skipppp!!");
    skipRequested = true;
}

// Pictures Effects 


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
$(document).on("click", ".characters-img", function() {
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
$(document).on("click", "#popupModal", function() {
    $("#popupModal").fadeOut();
});

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
            gameStarted = false;
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
    $(document).on("click", ".start-story", function() {
        gameStarted = true;
        showChapter1();
        junglesSound.play();
    });
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
    $(document).on("click", ".cnt-btn", function() {
        showChapter3();
        junglesSound.pause();
        windSound.play();
    });
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
    $(document).on("click", ".skip-btn", skipTyping);
};

// Main Page
function mainPage() {
    const data = storyData.main;
    $(".story-heading").text(data.heading);
    $(".story-text").html(data.intro);
    $("#choices-container").html(` <button class="btn btn-intro meet-characters">Meet the Characters!</button>`);
    $("#pictures-container").hide();
    $(".skip-btn").hide();
};

//  Meeting Characters Chapter
function showCharacters() {
    const data = storyData.characters;

    $(".story-heading").text(data.heading);
    $(".story-text").text(data.intro);
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
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story);
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
};

// Chapter 2
function showChapter2(index) {
    const data = storyData.chapter2;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story[index].story);
    $("#choices-container").html(`<button class="btn cnt-btn">Continue...</button>`);
};

// Chapter 3
function showChapter3() {
    const data = storyData.chapter3;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story);
    $("#choices-container").html(generateChoices(data));
};

//Chapter 4 
function showChapter4(index) {
    const data = storyData.chapter4;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story[index].story);
    $("#choices-container").html(`<button class="btn cnt-btn2">Continue...</button>`);
};

// Chapter 5
function showChapter5() {
    const data = storyData.chapter5;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story);
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
};

// Chapter 6
function showChapter6(index) {
    const data = storyData.chapter6;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story[index].story);
    $("#choices-container").html(`<button class="btn cnt-btn3">Continue...</button>`);
};

//Chapter 7
function showChapter7() {
    const data = storyData.chapter7;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story);
    $("#choices-container").html(generateChoices(data));
};

// Chapter 8
function showChapter8(index) {
    const data = storyData.chapter8;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story[index].story);
    $("#choices-container").html(`<button class="btn btn-restart">The End</button>`);
};