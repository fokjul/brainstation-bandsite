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

//Display initial comments from "comments" array of objects
comments.forEach(item => {
    const commentElements = createCommentStructure();

    //destructuring assignment of an array elemenets
    const [comment, commentDiv, commentImg, commentBody, commentWrapper, commentAuthor, commentDate, commentText] = commentElements;
    
    commentContainer.append(comment, commentDiv);
    comment.append(commentImg, commentBody);
    commentBody.append(commentWrapper, commentText);
    commentWrapper.append(commentAuthor, commentDate);
    
    commentAuthor.innerText = item.author;
    commentText.innerText = item.text;
    commentDate.innerText = item.date;
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
        console.log(requiredFields);
        let isOk = true;
        const newComment = {
            author: "", 
            date: "", 
            text: "",
        };

        requiredFields.forEach(field => {
            console.log(field.value)
            if (field.value === '') {
                isOk = false;
                field.classList.add('form__input-error');
            } 
            else {
                field.classList.remove('form__input-error');
                //get posted date in format dd/mm/yyyy
                const currentDate = new Date().toLocaleDateString('en-GB');
                newComment.author = userName.value;
                newComment.date = currentDate;
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
    const commentElements = createCommentStructure();
        const [comment, commentDiv, commentImg, commentBody, commentWrapper, commentAuthor, commentDate, commentText] = commentElements;
        commentContainer.append(comment, commentDiv);
        comment.append(commentImg, commentBody);
        commentBody.append(commentWrapper, commentText);
        commentWrapper.append(commentAuthor, commentDate);
        
        commentAuthor.innerText = newComment.author;
        commentText.innerText = newComment.text;
        commentDate.innerText = newComment.date;
}

addNewComment(commentsUpdated)
