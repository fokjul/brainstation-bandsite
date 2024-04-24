import comments from './copy.js'; 

const commentContainer = document.querySelector('.comments__container');

const createElement = (element, classname) => {
    const elementHTML = document.createElement(element);
    elementHTML.classList.add(classname);
    return elementHTML;
}

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

const createComment = () => {
    return commentBlock.map(item => {
        return createElement(item.tagHTML, item.classCSS);
    })
}

comments.forEach(item => {
    const commentElements = createComment();
    const [comment, commentDiv, commentImg, commentBody, commentWrapper, commentAuthor, commentDate, commentText] = commentElements;
    
    commentContainer.append(comment, commentDiv);
    comment.append(commentImg, commentBody);
    commentBody.append(commentWrapper, commentText);
    commentWrapper.append(commentAuthor, commentDate);
    
    commentAuthor.innerText = item.author;
    commentText.innerText = item.text;
    commentDate.innerText = item.date;
});
 

// const comment = createElement ("div", "comment");
    // const commentDiv = createElement ("div", "divider");
    // const commentImg = createElement ("div", "comment__img");
    // const commentBody = createElement ("div", "comment__body");
    // const commentWrapper = createElement ("div", "comment__wrapper");
    // const commentAuthor = createElement ("p", "comment__author");
    // const commentDate = createElement ("p", "comment__date");
    // const commentText = createElement ("p", "comment__text");


const userName = document.getElementById('userName');
const userComment = document.getElementById('userComment');
const commentForm = document.getElementById('commentForm');


const addNewComment =() => {
    commentForm.addEventListener('submit', (e)=> {
        const currentDate = Math.floor(Date.now() / 1000);
        e.preventDefault();
        const newComment = {author: userName.value, date: currentDate, text: userComment.value};
        debugger;
        console.log(newComment);
        
        console.log(comments);
        return comments;
    })
}



comments.push(addNewComment());

console.log(addNewComment());
