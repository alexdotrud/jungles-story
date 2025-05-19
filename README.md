<!--
For creating logo -https://new.express.adobe.com/
https://coolors.co/29339b-74a4bc-b6d6cc-f1fec6-ff3a20 -for creating color pallete.
(https://www.w3schools.com/css/css3_gradients.asp) - for CSS/ HTML
https://pixabay.com/ - picture of papirus.
https://imageresizer.com/
https://www.youtube.com/watch?v=MiTJnYHX3iA -tutorial for typewritter effect
https://www.youtube.com/watch?v=r_PL0K2fGkY - pop up tutorial
https://expertbeacon.com/how-to-read-a-json-file-in-javascript-reading-json-in-js/ - how to manage json files
https://pixabay.com/sound-effects/ -for the sounds
https://alessiopuppialchemy.com/2025/04/01/how-to-allow-only-numbers-or-letters-in-input-fields/ - for inputs
character image -using chat gpt
other illustration for the story https://www.midjourney.com/imagine


Bugs: 
After adding restart button amd mainPage function - pictures from meetCharacters dissapeared.
Now dissapeared the modal for the pictures?
Syntax bugs
After adding showChapter4 and 6 to game steps, in the game after pressing button on the chapter 1, 4 ,5 is was not going in chapter order(randomly) - added if statement to the gameSteps function.
main page function was not working (empty page) -added to the fetch function.
When added restart button - all of the modals dissapeared (just changed frpm $(.class)click(function) to $(document).on(click, class, function))
After adding typing effect - the text was jumping, fixed main contyainer style to display flex, justify flex-start
-->

# **Jungle's Story**
![Home page responsivness]()

[View live project here!]()


Welcome to Jungle's Story, an interactive adventure game that takes you deep into the heart of the jungle alongside a young explorer named Aurora, her loyal dog named Dog, and her best friend Rick. This project is designed to showcase interactive storytelling, user-driven choices, and captivating jungle-themed experiences.

## Content:
- [User Goals](#user-goals)  
- [Business Goals](#business-goals)  
- [Developer Goals](#developer-goals)  
- [User Stories](#user-stories)  
- [Design Choices](#design-choices)  
- [Features](#features)  
- [UX Design](#ux-design)  
- [Technologies Used](#technologies-used)  
- [Testing](#testing)  
- [Bugs](#bugs) 
- [Technical Issues](#technical-issue-with-commit-attribution)
- [Deployment](#deployment)  
- [Publishing](#publishing)  
- [Credits](#credits)  


## User Goals
The website is designed to create an interactive story for users passionate about adventures.

#### Users should be able to:
- Navigate through the story by making choices that influence the plot.
- Interact with characters and objects to uncover clues and treasures.
- Enjoy an immersive experience with sounds, animations, and background effects.
- Go back to the Manual from any point of the story.

## Business Goals
Although primarily an educational and portfolio project, it aims to:
- Showcase interactive storytelling capabilities using JavaScript.
- Demonstrate user engagement through sound and visual effects.
- Highlight technical skills in front-end development and UI/UX design.

## Developer Goals
- Build a fully responsive interactive story using HTML, CSS, and JavaScript.
- Implement smooth animations and sound effects triggered by story events.
- Manage game state and content efficiently using JSON files.
- Use modular code for easy updates and feature additions.

## User Stories
- As a player, I want to read an engaging story with choices that affect the outcome.
- As a player, I want to hear music to enhance immersion.
- As a player, I want the ability to restart the game at any point.
- As a player, I want character images to be interactive.

 ## Design Choices
 
 Wireframes:
(documentation/)

## Features
### Navbar

## Main Page


### Footer

![Footer](documentation/)

## UX Design


### Color Scheme:



### Fonts:



## Technologies used

- **HTML** is used to structure the content on the website, including headings, paragraphs, and forms.

- **CSS** is used to style the website, including layouts, colors, fonts, and overall design.

- **CSS Flexbox** is used for creating responsive layouts by aligning and distributing elements within a container.

- **Bootstrap** is used for quick and responsive design with pre-built components like navigation bars and buttons.

- **JavaScript** is used for navbar.

- **Git** is used for version control, allowing tracking of code changes and collaboration with team members.

- **GitHub** is used to host the project’s repository and deploy the website through GitHub Pages.

- **Font Awesome** is used to add scalable vector icons to the website for better user interaction.

- **Google Fonts** is used to enhance typography by integrating stylish fonts into the website.

- **Visual Studio Code** is used as the code editor for writing and managing the website's source code.

## Testing 
### Manual testing results:



#### Lighthouse Report:



### Compatibility


- **Chrome:**  


- **Mozilla Firefox:**


- **Microsoft Edge:**


### Responsiveness

- **Main Page:**

![Home Page responsiveness](documentation/)



### Validator Testing 

#### HTML 

On sign up page use (fieldset) element inside div with radio-buttons and checkboxes - fixed.
No other errors or warnings were found.

  - **Index.html:** 

  ![Index.html](documentation/)

#### CSS

  - **Style.css:**

  ![Style.css](documentation/)

## Bugs

### Solved bugs


### Unfixed Bugs

- No unfixed bugs found.


## Deployment
[Live project can be found here!](https://alexdotrud.github.io/floristry_school_project/)

The project was deployed using GitHub Pages, which allows for easy hosting of static websites directly from a GitHub repository.
 Below are the steps taken to deploy the website.

 ### Steps to Deploy:

#### 1. Push to GitHub Repository:
First, the project files were committed to a GitHub repository. All HTML, CSS, JavaScript, and image files were uploaded and organized within the repository.
#### 2. GitHub Pages Setup:
Once the repository was set up, the GitHub Pages feature was enabled. This is done through the repository's settings.
In the repository’s settings, navigate to the "Pages" section.
Select the main branch (or the branch containing your index.html file) as the source for GitHub Pages.
Choose the root directory as the source if the index.html file is located in the main directory.
#### 3. Accessing the Live Site:
After enabling GitHub Pages, GitHub generates a URL where the project can be viewed live. This URL is shared and accessible by anyone with the link.
The live project can be accessed here: Live Project URL.
#### 4. Continuous Updates:
Any future changes or updates made to the website can be easily deployed by committing changes to the repository, which automatically updates the live site.

## Publishing
We welcome contributions to floristry_school_project! Follow these steps:

### Cloning
1. On GitHub.com, navigate to the main page of the repository.
2. Above the list of files, click Code.
3. Copy the URL for the repository.

 ![Copy this URL](documentation/url-copy.png)

4. Type git clone in opened terminal, and then paste the URL you copied earlier.
5. Press Enter to create your local clone.

### Forking
1. Fork the repository.  

2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit:  
   ```bash
   git commit -m "Add feature description"
   ```

4. Push the latest changes and open a pull request:
   ```bash
   git push
   ```




## Credits 

### Content 
- #### Text Content: 
All the content provided on this website is fictional and created for demonstration purposes only.
- #### Images:

1. Picture from Home Page are from- (https://pixabay.com/).
2. Pictures from Gallery Page and picture from Sign Up Page are from - (https://www.pexels.com/).
3. Logo was created on - (https://www.designevo.com/logo-maker/).


### Media
1. **Fonts**: The website uses the Delius Swash Caps font, available from Google Fonts.
2. **Icons**: Icons used in the site were sourced from FontAwesome (https://fontawesome.com/).

### Other tools:
1. **Stack Overflow**: Used for troubleshooting and seeking solutions to development challenges (https://stackoverflow.com/).
2. **CodeWithAnbu**: Resource for learning and improving web development techniques (https://codewithanbu.com/).
3. **W3Schools**: Used for reference and tutorials on HTML, CSS, JavaScript, and more (https://www.w3schools.com/).
4. **Chrome DevTools Lighthouse**: Used to test and improve web performance (https://developer.chrome.com/docs/lighthouse/performance/).
5. **ExpertBeacon**: Helped in learning how to optimize Google Fonts loading for better performance (https://expertbeacon.com/the-ultimate-guide-to-preloading-google-fonts-for-optimal-web-performance/).
6. **Schemecolor**: Used to create color scheme (https://www.schemecolor.com/).
7. **Code Institute**: Used for learning web development techniques and improving skills through the full stack developer program (https://www.codeinstitute.net/).