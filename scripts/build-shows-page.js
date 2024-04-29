import {shows} from './copy.js'; 
const showsGrid = document.querySelector('.shows__grid');
const showsGridMobile = document.querySelector('.shows__grid--mobile');

const createElement = (elementHTML, classCSS, rowNumber = "0") => {
    const newElement = document.createElement(elementHTML);
    newElement.classList.add(classCSS);
    newElement.setAttribute('data-row', rowNumber);
    return newElement;
}

const createShowGrid = () => {
    
    const valueClassList = ['shows__grid-value--venue', 'shows__grid-value--date', 'shows__grid-value--location'];

    shows.forEach((show, index) => {
        let showsGridCellContainer;
        let showsGridRow;

        //Creating a grid row
        showsGridRow = createElement('div', 'shows__grid-row', index + 1);
            for ( const showInfoType in show) {  
                valueClassList.forEach((className) => {
                    if (className.includes(showInfoType)) {

                        //Creating grid cell
                        const showsGridCell = createElement('p', className);
                        showsGridCell.innerText = show[showInfoType];

                        //Creating a grid cell container and apending grid cell to it
                        showsGridCellContainer = createElement('div', `${className}-container`, index + 1);
                        showsGridCellContainer.append(showsGridCell);

                        //Appending each showsGridCellContainer to a row that has the same data-row attribute 
                        if (showsGridRow.getAttribute("data-row") === showsGridCellContainer.getAttribute("data-row")) {
                        showsGridRow.append(showsGridCellContainer);
                        }
                    } 
                })
            }
            
        //Creating Buy Ticket Button
        const showBtn = createElement('button', 'shows__button');
        showBtn.innerText = 'but tickets';

        //Creating Buy Ticket Button and appending Buy Ticket Button to it
        const showBtnContainer = createElement('div', `${showBtn.classList}-container`, index + 1);
        showBtnContainer.append(showBtn)

        //Apending Buy Ticket Button to each row
        showsGridRow.append(showBtnContainer);

        //Apending each row to the grid
        showsGrid.append(showsGridRow);
    })
}

createShowGrid()

const createShowGridMob = () => {
    const labelClassList = ['shows__grid-label--venue', 'shows__grid-label--date', 'shows__grid-label--location'];
    
    const valueClassList = ['shows__grid-value--venue', 'shows__grid-value--date', 'shows__grid-value--location'];

    shows.forEach((show, index) => {
        let showsGridCellContainer;
        let showsGridRow;

        //Creating a grid row
        showsGridRow = createElement('div', 'shows__grid-row', index + 1);
            for ( const showInfo in show) {  
                valueClassList.forEach((valueClassName) => {
                    labelClassList.forEach((labelClassName) => {
                        if (valueClassName.includes(showInfo)) {

                            if(labelClassName.includes(showInfo)){
                                //Creating grid cell
                                const showGridCell = createElement('p', valueClassName);
                                showGridCell.innerText = show[showInfo];
        
                                //Creating grid cell label
                                const showGridCellLabel = createElement('p', labelClassName);
                                showGridCellLabel.innerText = showInfo;
        
                                //Creating a grid cell container and apending grid cell to it
                                showsGridCellContainer = createElement('div', `${valueClassName}-container`, index + 1);
                                showsGridCellContainer.append(showGridCellLabel);
                                showsGridCellContainer.append(showGridCell);
        
                                //Appending each showsGridCellContainer to a row that has the same data-row attribute 
                                if (showsGridRow.getAttribute("data-row") === showsGridCellContainer.getAttribute("data-row")) {
                                showsGridRow.append(showsGridCellContainer);
                                }
                            }
    
                        } 
                    })
                })
            }
            
        //Creating Buy Ticket Button
        const showBtn = createElement('button', 'shows__button');
        showBtn.innerText = 'but tickets';

        //Creating Buy Ticket Button and appending Buy Ticket Button to it
        const showBtnContainer = createElement('div', `${showBtn.classList}-container`, index + 1);
        showBtnContainer.append(showBtn)

        //Apending Buy Ticket Button to each row
        showsGridRow.append(showBtnContainer);

        //Apending each row to the grid
        showsGridMobile.append(showsGridRow);
    })
}

createShowGridMob()