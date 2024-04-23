import comments from './copy.js'; 

const commentContainer = document.querySelector('.comments__container');

const commentLength = comments.length;
let comment;
let commentDiv;
let commentImg;
let commentBody;
let commentWrapper;
let commentAuthor;
let commentDate;
let commentText;



comments.forEach(item => {
    comment = document.createElement('div');
    comment.classList.add('comment');

    commentDiv = document.createElement('div');
    commentDiv.classList.add('divider');

    commentImg = document.createElement('div');
    commentImg.classList.add('comment__img');

    commentBody = document.createElement('div');
    commentBody.classList.add('comment__body');

    commentWrapper = document.createElement('div');
    commentWrapper.classList.add('comment__wrapper');

    commentAuthor = document.createElement('p');
    commentAuthor.classList.add('comment__author');

    commentDate = document.createElement('p');
    commentDate.classList.add('comment__date');

    commentText = document.createElement('p');
    commentText.classList.add('comment__text');

    commentContainer.append(comment, commentDiv);
    comment.append(commentImg, commentBody);
    commentBody.append(commentWrapper, commentText);
    commentWrapper.append(commentAuthor, commentDate);
    
    commentAuthor.innerText = item.author;
    commentText.innerText = item.text;
    commentDate.innerText = item.date;
});
