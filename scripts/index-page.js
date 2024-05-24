//import {comments} from './copy.js'; 
import BandSiteApi from './band-site-api.js';

//Creating an instance of BandSiteApi class
const siteApi = new BandSiteApi("6d214e4c-4b00-4c47-a134-6d78a8c8e62e");

class ElementInstance {
    constructor (elementHtmlTag, elementCssClass, variableName, elementText = null) {
        this.elementHtmlTag = elementHtmlTag,
        this.elementCssClass = elementCssClass,
        this.variableName = variableName,
        this.elementText = elementText
    }

    createElementObject(arrayOfObjects) {
        let commentObj = {
            elementHtmlTag: this.elementHtmlTag,
            elementCssClass: this.elementCssClass,
            variableName: this.variableName,
            elementText: this.elementText,
        }
        return arrayOfObjects.push(commentObj);
    }

    createCommentHTMLArr(HTMLArr) {
        if(this.elementHtmlTag && this.elementCssClass) {
            const elementHTML = document.createElement(this.elementHtmlTag);
            elementHTML.classList.add(this.elementCssClass);
            
            if (this.elementHtmlTag === 'p') {
                elementHTML.innerHTML = this.elementText
            }
                 
            HTMLArr.push(elementHTML);
        }
        return HTMLArr
    }
}

class ButtonInstance extends ElementInstance {
    constructor (elementHtmlTag, elementCssClass, variableName, elementText, elementId) {
        super(elementHtmlTag, elementCssClass, variableName, elementText)
        this.elementId = elementId
    }

    createElementObject (arrayOfObjects) {
        let buttonObj = {
            elementHtmlTag: this.elementHtmlTag,
            elementCssClass: this.elementCssClass,
            variableName: this.variableName,
            elementText: this.elementText,
            elementId: this.elementId
        }
        return arrayOfObjects.push(buttonObj);
    }

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
    createCommentHTMLStructure(element, arr) {
        const comment = new ElementInstance ('div','comment', 'comment', null);
        comment.createElementObject(arr)
        
        const commentDiv = new ElementInstance ('div','divider', 'commentDiv', null);
        commentDiv.createElementObject(arr)
        
        const commentImg = new ElementInstance ('div','comment__img', 'commentImg', null);
        commentImg.createElementObject(arr)
    
        const commentBody = new ElementInstance ('div','comment__body', 'commentBody', null);
        commentBody.createElementObject(arr)
    
        const commentWrapper = new ElementInstance ('div','comment__wrapper', 'commentWrapper', null);
        commentWrapper.createElementObject(arr)
    
        const commentAuthor = new ElementInstance ('p','comment__author', 'commentAuthor', element.name);
        commentAuthor.createElementObject(arr)
    
        const commentDate = new ElementInstance ('p','comment__date', 'commentDate', timeAgo(element.timestamp));
        commentDate.createElementObject(arr)
    
        const commentText = new ElementInstance ('p','comment__text', 'commentText', element.comment);
        commentText.createElementObject(arr)
    
        const commentBtnContainer = new ElementInstance ('div','comment__btnContainer', 'commentBtnContainer', null);
        commentBtnContainer.createElementObject(arr)
    
        const likeContainer = new ElementInstance ('div','comment__likeContainer', 'likeContainer', null);
        likeContainer.createElementObject(arr)
    
        const commentLikeCounter = new ElementInstance ('p','comment__LikeCounter', 'commentLikeCounter', element.likes);
        commentLikeCounter.createElementObject(arr)
    
        return arr;
    },
    
    createButtonHTMLStructure(element, arr) {
        const deleteBtn = new ButtonInstance ('button', 'comment__deleteBtn', 'deleteBtn', 'Delete', element.id);
        deleteBtn.createElementObject(arr)
        const likeBtn = new ButtonInstance ('button', 'comment__likeBtn', 'likeBtn', 'Like', element.id);
        likeBtn.createElementObject(arr)
    
        return arr
    },

    createComment(element) {
        const arrayOfTags = [];

        const arrayOfCommentObj = [];
        const commentHTMLStructure = this.createCommentHTMLStructure(element, arrayOfCommentObj)
        commentHTMLStructure.forEach(item => {
            let commentElement = item.variableName;
            commentElement = new ElementInstance(item.elementHtmlTag, item.elementCssClass, item.variableName, item.elementText)
            commentElement.createCommentHTMLArr(arrayOfTags)
        })

        const arrayOfButtonObj = [];
        const buttonHTMLStructure = this.createButtonHTMLStructure(element, arrayOfButtonObj)
        buttonHTMLStructure.forEach((item) => {
            let btnElement = item.variableName;
            btnElement = new ButtonInstance(item.elementHtmlTag, item.elementCssClass, item.variableName, item.elementText, element.id)
            btnElement.createButtonHTML(arrayOfTags)
        })

        return arrayOfTags;
    },

    appendComment(element) {
        const commentContainer = document.querySelector('.comments__container');
        
        //Destructuring assignment of an array elemenets to create a variable for each element in the array
        const [comment, commentDiv, commentImg, commentBody, commentWrapper, commentAuthor, commentDate, commentText, commentBtnContainer,likeContainer, likeCounter, deleteBtn, likeBtn, ] = this.createComment(element);
    
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
            commentElementObj.appendComment(comment);
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


