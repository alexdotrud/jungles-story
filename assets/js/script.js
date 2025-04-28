const storyContainer = document.getElementById("story-container");
const picturesContainer = document.getElementById("pictures-container");
const choicesContainer = document.getElementById("choices-container");

$(document).ready(function() {
    
$(".meet-characters").click(function Characters(){
$(".story-heading").text(`<h1>Meet the Explorers</h1>`);
$(".intro").hide();
$("#pictures-container").html(`<img src="assets/images/aurora.png" class="characters-img" alt="Picture of Aurora">
    <img src="assets/images/rick.png" class="characters-img" alt="Picture of Rick">
    <img src="assets/images/dog.png" class="characters-img" alt="Picture of Dog">`)
$("#choices-container").hide();
})
}

);