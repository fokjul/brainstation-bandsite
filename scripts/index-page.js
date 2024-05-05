import {comments} from './copy.js'; 

const commentContainer = document.querySelector('.comments__container');

const commentBlock = [
    {
        variableName: 'comment',
        tagHTML: 'div',
        classCSS: 'comment',
    },
    {
        variableName: 'commentDiv',
        tagHTML: 'div',
        classCSS: 'divider',
    },
    {
        variableName: 'commentImg',
        tagHTML: 'div',
        classCSS: 'comment__img',
    },
    {
        variableName: 'commentBody',
        tagHTML: 'div',
        classCSS: 'comment__body',
    },
    {
        variableName: 'commentWrapper',
        tagHTML: 'div',
        classCSS: 'comment__wrapper',
    },
    {
        variableName: 'commentAuthor',
        tagHTML: 'p',
        classCSS: 'comment__author',
    },
    {
        variableName: 'commentDate',
        tagHTML: 'p',
        classCSS: 'comment__date',
    },
    {
        variableName: 'commentText',
        tagHTML: 'p',
        classCSS: 'comment__text',
    },
]

//Function to create a new HTML element with CSS class for each object in an array
const createElement = (tagHTML, classCSS) => {
    const elementHTML = document.createElement(tagHTML);
    elementHTML.classList.add(classCSS);
    return elementHTML;
}

//For each object in "commentBlock" Array create a comment with HTML tag and class
const createCommentStructure = () => {
    return commentBlock.map(item => {
        return createElement(item.tagHTML, item.classCSS);
    })
}
// Function to convert milliseconds info human readable format from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeAgo(input) {
    const date = (input instanceof Date) ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
    };
    
    for (let key in ranges) {
        const secondsElapsed = (date.getTime() - Date.now()) / 1000;
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            //if number of milliseconds elapsed from the comment date < number of milliseconds in a year "3600 * 24 * 365" display in the following format: 
            if (Math.abs(secondsElapsed) < ranges['years']){
                return formatter.format(Math.round(delta), key);
            }
            
            //if number of milliseconds elapsed from the comment date > number of milliseconds in a year "3600 * 24 * 365" display initial input: 
            else {
                return input;
            }
        }
    }

    //if secondsElapsed is almost even to date
    return 'just now'
}
    
const displayComments = (element) => {
    //creating an array (html tags + css class)
    const commentElements = createCommentStructure();

    //Destructuring assignment of an array elemenets to create a variable for each element in the array
    const [comment, commentDiv, commentImg, commentBody, commentWrapper, commentAuthor, commentDate, commentText] = commentElements;

    commentContainer.append(comment, commentDiv);
    comment.append(commentImg, commentBody);
    commentBody.append(commentWrapper, commentText);
    commentWrapper.append(commentAuthor, commentDate);

    commentAuthor.innerText = element.author;
    commentText.innerText = element.text;
    commentDate.innerText = timeAgo(element.date);
}



//Display initial comments from "comments" array of objects
comments.forEach(comment => {
    displayComments(comment);
});

//Access form fields
const userName = document.getElementById('userName');
const userComment = document.getElementById('userComment');
const commentForm = document.getElementById('commentForm');

//Function to add event listener on form submit and display newly added comment ()
const addNewComment =(callback) => {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //Validating if required are not empty
        let requiredFields = document.querySelectorAll('.required');
        let isOk = true;
        const newComment = {
            author: "", 
            date: "", 
            text: "",
        };

        requiredFields.forEach(field => {
            if (field.value === '') {
                isOk = false;
                field.classList.add('form__input-error');
            } 
            else {
                field.classList.remove('form__input-error');
                
                //get posted date in format dd/mm/yyyy
                const currentDate = new Date().toLocaleDateString('en-GB');
                newComment.author = userName.value;
                newComment.date = timeAgo(currentDate);
                newComment.text = userComment.value; 
            
                //Push new comment object to "comments" array
                comments.push(newComment);  
            }
        })

        if (callback && isOk) {
            callback(newComment);
            userName.value = '';
            userComment.value = '';
        }
    })
}

//Callback function that creates and appends the new comment after form submit
const commentsUpdated = (newComment) => {
    displayComments(newComment);
}

addNewComment(commentsUpdated)
