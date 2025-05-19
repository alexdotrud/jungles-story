/* jshint esversion: 11 */
const heading = document.querySelector(".story-heading");
const storyText = document.querySelector(".story-text");
const btnIntro = document.querySelector(".btn-intro");
const picturesContainer = document.querySelector("#pictures-container");
const choicesContainer = document.querySelector("#choices-container");
const storyContainer = document.querySelector("#story-container");
let userName = " ";
let gameStarted = false;
let isTyping = false;
let skipRequested = false;
let clickCount = 0;

/**
 * Fetch Story Data from Json file
 */
let storyData = null;
fetch("assets/js/story.json")
    .then((response) => response.json())
    .then((data) => {
        storyData = data;
        mainPage();
        gameSteps();
    })
    .catch((error) => {
        console.error("Failed to load story data:", error);
        alert("Something went wrong while loading the story. Please try again later.");
    });

// Sounds
const auroraVoice = new Audio("assets/audio/aurora-voice.mp3");
const rickVoice = new Audio("assets/audio/rick-voice.mp3");
const dogBark = new Audio("assets/audio/bark-sound.mp3");
const junglesSound = new Audio("assets/audio/jungles-sound.mp3");
const windSound = new Audio("assets/audio/wind-sound.mp3");
const softBackground = new Audio("assets/audio/soft-background.mp3");
const stepSound = new Audio("assets/audio/steps.mp3");
const templeSound = new Audio("assets/audio/temple-sound.mp3");
const swirlSound = new Audio("assets/audio/swirl-sound.mp3");
const keySound = new Audio("assets/audio/key-sound.mp3");

/**
 * Typing Effect function. Adds letter by letter, creating typing effect.
 */
function textTypingEffect(storyText, plainText, fullHtmlText, i = 0, speed = 30) {
    // Clears text
    if (i === 0) {
        storyText.textContent = "";
        $("#choices-container").hide();
        $("#pictures-container").hide();
    }
    if (skipRequested) {
        storyText.innerHTML = fullHtmlText;
        isTyping = false;
        skipRequested = false;
        $(".skip-btn").hide();

        if (storyText === document.querySelector(".story-text")) {
            $("#choices-container").fadeIn(550);
            $("#pictures-container").fadeIn(550);
        }
        return;
    }
    // Adds one letter
    storyText.textContent += plainText[i];
    // If the last letter
    if (i === plainText.length - 1) {
        storyText.innerHTML = fullHtmlText;
        isTyping = false;

        if (storyText === document.querySelector(".story-text")) {
            $(".skip-btn").hide();
            $("#choices-container").fadeIn(550);
            $("#pictures-container").fadeIn(550);
        }
        return;
    }
    setTimeout(
        () => textTypingEffect(storyText, plainText, fullHtmlText, i + 1, speed),
        speed
    );
}

/**
Apply Typing Effect function. Applies typing to heading and text content.
 */
function applyTypingEffect(headingText, storyTextContent) {
    // When Start the Game button clicked
    if (gameStarted) {
        isTyping = true;
        skipRequested = false;
        // Removing HTML tags
        const headingPlainText = htmlToText(headingText);
        const storyPlainText = htmlToText(storyTextContent);
        // Lower speed for headings
        textTypingEffect(heading, headingPlainText, headingText, 0, 80);
        $(".skip-btn").show();
        // Typing story text and music after delay
        setTimeout(() => {
            textTypingEffect(storyText, storyPlainText, storyTextContent, 0, 30);
            updateBackgroundMusic();
        }, 200);
    }
}

/**
 * Transforms HTML to plain text
 */
function htmlToText(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || "";
}

/** 
 * Skips typing Effect
 */
function skipTyping() {
    skipRequested = true;
}

/**
 * Add's a PopUp module on character image
 */
$(document).on("click", ".characters-img", function () {
    let description;
    const alt = $(this).attr("alt");
    // Attaching right description for the right character
    if (alt === "Young girl with dark hair and freckles") {
        description = storyData.characters.images[0].description;
    } else if (alt === "Young man with map in his hands") {
        description = storyData.characters.images[1].description;
    } else if (alt === "A dog with orange coat and smart eyes") {
        description = storyData.characters.images[2].description;
    }
    // Show modal with description
    $("#modal-content").html(` <p>${description}</p>
        <span id="close-modal" class="close-btn">&times;</span>
        <i id="music-on" alt="${alt}" title="Click to hear the sound" class="fa-solid fa-play volume-icon"></i>`);
    $("#popupModal").fadeIn();
    // If the character has not been clicked before, increase click count
    if (!$(this).hasClass("clicked")) {
        $(this).addClass("clicked");
        clickCount++;
    }
});

/**
 * Closing PopUp with closing button
 */
$(document).on("click", "#close-modal", function () {
    $("#popupModal").fadeOut();
});

/**
 * Closing PopUp with clicking outside the modal
 */
$(document).on("click", "#popupModal", function (e) {
    if (e.target.id === "popupModal") {
        $("#popupModal").fadeOut();
    }
});

/**
 * Sound Effects for different characters
 */
$(document).on("click", "#music-on", function () {
    const alt = $(this).attr("alt");
    if (alt === "Young girl with dark hair and freckles") {
        auroraVoice.play();
    } else if (alt === "Young man with map in his hands") {
        rickVoice.play();
    } else if (alt === "A dog with orange coat and smart eyes") {
        dogBark.play();
    }
});

/**
 * Turn-on the background music
 */
$(document).on("click", "#volume-off", function () {
    updateBackgroundMusic();
    $("#volume-off").hide();
    $("#volume-on").show();
});

/**
 * Pause the background music
 */
$(document).on("click", "#volume-on", function () {
    $("#volume-on").hide();
    $("#volume-off").show();
});

/**
 * Updates music for the right chapter
 */
function updateBackgroundMusic() {
    // Pauses all previous music
    junglesSound.pause();
    windSound.pause();
    softBackground.pause();
    stepSound.pause();
    templeSound.pause();
    swirlSound.pause();
    keySound.pause();
    const chapter = $(".story-heading").text();
    // Play the correct music for the chapter
    if (chapter === "Chapter 1") {
        junglesSound.play();
    } else if (chapter === "Chapter 2") {
        stepSound.play();
    } else if (chapter === "Chapter 3") {
        windSound.play();
    } else if (chapter === "Chapter 4") {
        templeSound.play();
    } else if (chapter === "Chapter 5") {
        swirlSound.play();
    } else if (chapter === "Chapter 6") {
        softBackground.play();
    } else if (chapter === "Chapter 7") {
        keySound.play();
    }
}

/**
 * Generator for choices section
 */
function generateChoices(data) {
    let html = `<p>${data["choices-question"]}</p>`;
    for (let i = 0; i < data.choices.length; i++) {
        html += `<button class="btn btn-choice ${i + 1}" title="Every choice can change the story...">${data.choices[i].choice}</button>`;
    }
    return html;
}

/**
 * Lead to the Manual Page
 */
function restartGame() {
    // Dialogue for restart confirmation
    $(".dialogue").html(`
    <dialog id="restart" open>
    <p>Are you sure you want to go back to the Manual?</p>
    <form method="dialog">
    <button class="ok-no" value="yes">YES</button>
    <button class="ok-no" value="no">NO</button>
    </form>
    </dialog>`);
    $(".ok-no").click(function () {
        const buttonValue = $(this).val();
        if (buttonValue === "yes") {
            gameStarted = false;
            mainPage();
            $(".dialogue").empty();
        } else {
            $(".dialogue").empty();
        }
    });
}

/**
 * Warning dialog 
 */
function warningDialog(message) {
    $(".warning-text").text(message);
    $("#warning").show();
    // Close the warning when the OK button is clicked
    $(document).on("click", "#close-warning", function () {
        $("#warning").hide();
    });
}

/**
 * Game Steps in the right order
 */
function gameSteps() {
    $(document).on("click", ".meet-characters", function () {
        let nameInput = $("#name").val();
        if (nameInput === "") {
            warningDialog(`Please enter your username`);
            return;
        } else if (nameInput.length < 5 || nameInput.length > 20) {
            warningDialog(`Your username must be between 5 and 20 characters!`);
            return;
        } else if (!/^[^\s]+$/.test(nameInput)) {
            warningDialog(`Your username must be one word without spaces!`);
        } else {
            userName = nameInput;
            $("#warning").hide();
            showCharacters();
        }
    });
    $(document).on("click", ".start-story", function () {
        if (clickCount < 3) {
            warningDialog(`You must click on all characters to start the game!`);
            return;
        } else {
            gameStarted = true;
            showChapter1();
        }
    });
    // The right choice for different button classes
    $(document).on("click", ".btn-choice", function () {
        const chapter = $(".story-heading").text();
        let index = 0;
        if ($(this).hasClass("1")) {
            index = 0;
        } else if ($(this).hasClass("2")) {
            index = 1;
        } else if ($(this).hasClass("3")) {
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
    $(document).on("click", ".cnt-btn", function () {
        showChapter3();
    });
    $(document).on("click", ".cnt-btn2", showChapter5);
    $(document).on("click", ".cnt-btn3", showChapter7);
    $(document).on("click", ".btn-restart", restartGame);
    $(document).on("click", ".skip-btn", skipTyping);
}

/**
 * Main Page content
 */
function mainPage() {
    const data = storyData.main;
    $(".story-heading").text(data.heading);
    $(".story-text").html(data.intro);
    $(".btn-restart").hide();
    $("#warning").hide();
    $("#volume-off").hide();
    $("#volume-on").hide();
    $("#choices-container").html(` 
        <input type="text" id="name" placeholder="Enter your username"></input> <br>
        <button class="btn btn-intro meet-characters">Meet the Characters!</button>`);
    $("#pictures-container").hide();
    $(".skip-btn").hide();

}

/**
 * Meet Characters Chapter content
 */
function showCharacters() {
    const data = storyData.characters;
    $(".story-heading").text(data.heading);
    $(".story-text").text(data.intro);
    $("#pictures-container").show();
    $(".btn-restart").show();
    $("#volume-off").hide();
    $("#volume-on").hide();

    // Modal for extra information
    $("#pictures-container").html(`
        <div id="popupModal" class="modal">
            <div id="modal-content">
            </div>
        </div>
        <img src="assets/images/aurora.png" class="characters-img" alt="Young girl with dark hair and freckles">
        <img src="assets/images/rick.png" class="characters-img" alt="Young man with map in his hands">
        <img src="assets/images/dog.png" class="characters-img" alt="A dog with orange coat and smart eyes">
        `);

    $("#choices-container").html(
        `<button class="btn start-story">Start The Story</button>`,
    );
}

/**
 * Chapter 1 content
 */
function showChapter1() {
    const data = storyData.chapter1;
    $("#choices-container").html("");
    $("#pictures-container").empty();
    applyTypingEffect(data.heading, data.story);
    $("#volume-off").show();
    $(".start-story").hide();
    $("#choices-container").html(generateChoices(data));
}

/**
 * Chapter 2 content
 */
function showChapter2(index) {
    const data = storyData.chapter2;
    applyTypingEffect(data.heading, data.story[index].story);
    $("#volume-on").hide();
    $("#volume-off").show();
    $("#pictures-container").html(
        `<img src="assets/images/stone-arch.png" class="story-image" alt="Dog, Aurora and Rick looking at swirling glyph"></img>`,
    );
    $("#choices-container").html(
        `<button class="btn cnt-btn">Continue...</button>`,
    );
}

/**
 * Chapter 3 content
 */
function showChapter3() {
    const data = storyData.chapter3;
    $("#pictures-container").empty();
    applyTypingEffect(data.heading, data.story);
    $("#volume-on").hide();
    $("#volume-off").show();
    $("#choices-container").html(generateChoices(data));
}

/**
 * Chapter 4 content
 */
function showChapter4(index) {
    const data = storyData.chapter4;
    applyTypingEffect(data.heading, data.story[index].story);
    $("#volume-on").hide();
    $("#volume-off").show();
    $("#pictures-container").html(
        `<img src="assets/images/golden-swirl.png" class="story-image" alt="Golden swirl on the platform is shining bright"></img>`,
    );
    $("#choices-container").html(
        `<button class="btn cnt-btn2">Continue...</button>`,
    );
};

/**
 * Chapter 5 content
 */
function showChapter5() {
    const data = storyData.chapter5;
    $("#pictures-container").empty();
    applyTypingEffect(data.heading, data.story);
    $("#volume-on").hide();
    $("#volume-off").show();
    $("#choices-container").html(generateChoices(data));
};

/**
 * Chapter 6 content
 */
function showChapter6(index) {
    const data = storyData.chapter6;
    $("#pictures-container").hide();
    applyTypingEffect(data.heading, data.story[index].story);
    $("#volume-on").hide();
    $("#volume-off").show();
    $("#choices-container").hide();
    $("#choices-container").html(
        `<button class="btn solve-puzzle">Solve the test...</button>`,
    );
};

/**
 * Puzzle Game content
 */
function showPuzzleGame() {
    $("#choices-container").hide();
    $(".story-text").html(
        `<h3 id="key-question">Which key matches the SUN symbol?</h3>`,
    );
    $("#pictures-container").html(`<div class="puzzle-wrapper">
    <div class="key-row">
        <img src="assets/images/key-red.png" class="key-image" alt="Red old key">
        <img src="assets/images/key-blue.png" class="key-image" alt="Blue old key">
        <img src="assets/images/key-yellow.png" class="key-image" alt="Yellow old key">
    </div>
    <img src="assets/images/treasure-box.png" class="story-image treasure-box" alt="Old treasure box with sun, moon and star symbols">
    </div>`);
    currentQuestion = "Which key matches the SUN symbol?";
    $("#key-question").text(currentQuestion);
};

/**
 * Puzzle Game logic
 */
$(document).on("click", ".solve-puzzle", function () {
    showPuzzleGame();
    $("#key-question").text(currentQuestion);
});
$(document).on("click", ".key-image", function () {
    const alt = $(this).attr("alt");
    if (currentQuestion === "Which key matches the SUN symbol?") {
        if (alt === "Red old key") {
            currentQuestion = "Which key matches the MOON symbol?";
            $("#key-question").text(currentQuestion);
        } else {
            warningDialog("It is not the right key. Try again!");
        }
    } else if (currentQuestion === "Which key matches the MOON symbol?") {
        if (alt === "Blue old key") {
            currentQuestion = "Which key matches the STAR symbol?";
            $("#key-question").text(currentQuestion);
        } else {
            warningDialog("It is not the right key. Try again!");
        }
    } else if (currentQuestion === "Which key matches the STAR symbol?") {
        if (alt === "Yellow old key") {
            $("#key-question").text("Puzzle solved!");
            $("#choices-container").show();
            $("#choices-container").html(
                `<button class="btn cnt-btn3">Continue...</button>`,
            );
        } else {
            warningDialog("It is not the right key. Try again!");
        }
    }
});

/**
 * Chapter 7 content
 */
function showChapter7() {
    const data = storyData.chapter7;
    gameStarted = true;
    $(".story-heading").text("");
    $(".story-text").html("");
    $("#choices-container").html("");
    $("#pictures-container").empty();
    applyTypingEffect(data.heading, data.story);
    $("#volume-on").hide();
    $("#volume-off").show();
    $("#choices-container").html(`
        <p>Thank you for this game ${userName.toUpperCase()}!</p>
        <button class="btn btn-restart">Go Back to The Manual!</button>
    `);
}