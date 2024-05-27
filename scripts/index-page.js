//import {comments} from './copy.js'; 
import BandSiteApi from './band-site-api.js';

//Creating an instance of BandSiteApi class
const siteApi = new BandSiteApi("6d214e4c-4b00-4c47-a134-6d78a8c8e62e");

class ElementInstance {
    constructor (elementHtmlTag, elementCssClass, elementText = null) {
        this.elementHtmlTag = elementHtmlTag,
        this.elementCssClass = elementCssClass,
        this.elementText = elementText
    }

    //Static method that initiaalizes a new intance
    static createElement(elementHtmlTag, elementCssClass, elementText) {
        return new ElementInstance(elementHtmlTag, elementCssClass, elementText)
    }
    
    //Creates HTML structure for all comment elements except for buttons
    createCommentHTML(arr) {
        if(this.elementHtmlTag && this.elementCssClass) {
            const elementHTML = document.createElement(this.elementHtmlTag);
            elementHTML.classList.add(this.elementCssClass);
            
            if (this.elementHtmlTag === 'p') {
                elementHTML.innerHTML = this.elementText
            }
                 
            arr.push(elementHTML);
        }
        return arr
    }
}

class ButtonInstance extends ElementInstance {
    constructor (elementHtmlTag, elementCssClass, elementText, elementId) {
        super(elementHtmlTag, elementCssClass, elementText)
        this.elementId = elementId
    }

    //Static method that initiaalizes a new intance
    static createButton (elementHtmlTag, elementCssClass, elementText, elementId) {
        return new ButtonInstance(elementHtmlTag, elementCssClass, elementText, elementId)
    }

    //Creates HTML structure for buttons
    async createButtonHTML (arr) {
        if(this.elementHtmlTag && this.elementCssClass) {
            const elementHTML = document.createElement(this.elementHtmlTag);
            elementHTML.classList.add(this.elementCssClass);
            elementHTML.innerText = this.elementText;
            elementHTML.dataset.id = this.elementId;

            if (this.elementCssClass === 'comment__deleteBtn') {
            }
            
            elementHTML.addEventListener("click", async function() {
                if (elementHTML.className === 'comment__deleteBtn') {
                    await siteApi.deleteComment(elementHTML.dataset.id);
                } else {await siteApi.likeComment(elementHTML.dataset.id);}
                commentListObj.displayCommentList();
            })
            arr.push(elementHTML);
        }
        return arr
    }
}

const commentElementObj = {
    createCommentStructure(element) {
        const elementArray = [];
        elementArray.push(
            ElementInstance.createElement('div','comment', null),
            ElementInstance.createElement('div','divider', null),
            ElementInstance.createElement('div','comment__img', null),
            ElementInstance.createElement('div','comment__body', null),
            ElementInstance.createElement('div','comment__wrapper', null),
            ElementInstance.createElement('p','comment__author', element.name),
            ElementInstance.createElement('p','comment__date', timeAgo(element.timestamp)),
            ElementInstance.createElement('p','comment__text', element.comment),
            ElementInstance.createElement('div','comment__btnContainer', null),
            ElementInstance.createElement('div','comment__likeContainer', null),
            ElementInstance.createElement('p','comment__LikeCounter', element.likes)
        )

        const buttonArray = [];
        buttonArray.push(
            ButtonInstance.createButton('button', 'comment__deleteBtn', 'Delete', element.id),
            ButtonInstance.createButton('button', 'comment__likeBtn', 'Like', element.id)
        )

        const arrayOfTags = [];
        elementArray.forEach(element => {
            element.createCommentHTML(arrayOfTags)
        });
        buttonArray.forEach(button => {
            button.createButtonHTML(arrayOfTags)
        });

        return arrayOfTags;
    },
    
    //Takes an array of element nodes from createCommentStructure() and appends it to UI
    appendCommentStrcuture(element) {
        const commentContainer = document.querySelector('.comments__container');
        
        //Destructuring assignment of an array elemenets to create a variable for each element in the array
        const [comment, commentDiv, commentImg, commentBody, commentWrapper, commentAuthor, commentDate, commentText, commentBtnContainer,likeContainer, likeCounter, deleteBtn, likeBtn, ] = this.createCommentStructure(element);
    
        commentContainer.append(comment, commentDiv);
        comment.append(commentImg, commentBody);
        commentBody.append(commentWrapper, commentText, commentBtnContainer);
        commentBtnContainer.append(deleteBtn, likeContainer)
        likeContainer.append(likeBtn, likeCounter)
        commentWrapper.append(commentAuthor, commentDate);
    },

    //Function to add event listener on form submit and display newly added comment
    getCommentFromForm(callback) {
        //Access form fields
        const userName = document.getElementById('userName');
        const userComment = document.getElementById('userComment');
        const commentForm = document.getElementById('commentForm');
    
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
    
            //Validating if required are not empty
            let requiredFields = document.querySelectorAll('.required');
            let isOk = true;
            const newComment = {
                name: "", 
                comment: "",
            };
    
            requiredFields.forEach((field) => {
                if (field.value === '') {
                    isOk = false;
                    field.classList.add('form__input-error');
                } 
                else {
                    field.classList.remove('form__input-error');
                    newComment.name = userName.value;
                    newComment.comment = userComment.value; 
                }
            })
    
            if (callback && isOk) {
                callback(newComment);
                userName.value = '';
                userComment.value = '';
            }
        })
    },

    async displayNewComment(newComment){
        await siteApi.postComment(newComment);
        commentListObj.displayCommentList();
    },
}

const commentListObj = {
    async displayCommentList() {
        const comments = document.querySelectorAll('.comment');
        const dividers = document.querySelectorAll('.divider');
        comments.forEach(comment => comment.remove());
        dividers.forEach(divider => divider.remove());

        //Connecting to API to display list of comments
        const response = await siteApi.getCommentList();
        response.forEach(comment => {
            commentElementObj.appendCommentStrcuture(comment);
        });
    },
}

// Function to convert milliseconds info human readable format from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeAgo(input) {
    const date = (input instanceof Date) ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = {
        years: 3600 * 24 * 365, //31536000
        months: 3600 * 24 * 30, //2592000
        weeks: 3600 * 24 * 7, //604800
        days: 3600 * 24, //86400
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

            if (Math.abs(secondsElapsed) > ranges['years']){
                const commentDate = new Date(input);
                return commentDate.toDateString();
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

//Display comments when page loads
commentListObj.displayCommentList();

//Display newly added comment after form submit
commentElementObj.getCommentFromForm(commentElementObj.displayNewComment)


