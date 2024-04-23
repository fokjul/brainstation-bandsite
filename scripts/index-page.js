import comments from './copy.js'; 

const commentContainer = document.querySelector('.comments__container');

const createElement = (element, classname) => {
    const variable = document.createElement(element);
    variable.classList.add(classname);
    return variable;
}

comments.forEach(item => {
    const comment = createElement ("div", "comment");
    const commentDiv = createElement ("div", "divider");
    const commentImg = createElement ("div", "comment__img");
    const commentBody = createElement ("div", "comment__body");
    const commentWrapper = createElement ("div", "comment__wrapper");
    const commentAuthor = createElement ("p", "comment__author");
    const commentDate = createElement ("p", "comment__date");
    const commentText = createElement ("p", "comment__text");

    commentContainer.append(comment, commentDiv);
    comment.append(commentImg, commentBody);
    commentBody.append(commentWrapper, commentText);
    commentWrapper.append(commentAuthor, commentDate);
    
    commentAuthor.innerText = item.author;
    commentText.innerText = item.text;
    commentDate.innerText = item.date;
});
 

