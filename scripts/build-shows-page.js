import BandSiteApi from './band-site-api.js';

//Creating an instance of BandSiteApi class
const siteApi = new BandSiteApi("6d214e4c-4b00-4c47-a134-6d78a8c8e62e");

const shows = await siteApi.getShows();

//import {shows} from './copy.js'; 
const showsGrid = document.querySelector('.shows__grid');
const showsGridMobile = document.querySelector('.shows__grid--mobile');

//Function that creates a new element with CSS class and Data attribute
const createElement = (tagHTML, classCSS, dataAttribute = "0") => {
    const newElement = document.createElement(tagHTML);
    newElement.classList.add(classCSS);
    newElement.setAttribute('data-row', dataAttribute);
    return newElement;
}

function displayShowDate(input) {
    const commentDate = new Date(input);
                return commentDate.toDateString();
}

const createShowGrid = () => {
    
    const valueClassList = ['shows__grid-value--place', 'shows__grid-value--date', 'shows__grid-value--location'];

    shows.forEach((show, index) => {
        let showsGridCellContainer;
        let showsGridRow;

        //Creating a grid row
        showsGridRow = createElement('div', 'shows__grid-row', index + 1);
            for ( const showInfoType in show) { 
                valueClassList.forEach((className) => {
                    if (className.includes(showInfoType) && showInfoType !== 'id') {

                        //Creating grid cell
                        const showsGridCell = createElement('p', className);
                        if (showInfoType === 'date') {
                            const date = displayShowDate(show[showInfoType]);
                            showsGridCell.innerText = date;
                        } else {
                            showsGridCell.innerText = show[showInfoType];
                        }
                        

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
        showBtn.innerText = 'buy tickets';

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
    const labelClassList = ['shows__grid-label--place', 'shows__grid-label--date', 'shows__grid-label--location'];  
    const valueClassList = ['shows__grid-value--place', 'shows__grid-value--date', 'shows__grid-value--location'];

    shows.forEach((show, index) => {
        let showsGridCellContainer;
        let showsGridRow;

        //Creating a grid row
        showsGridRow = createElement('div', 'shows__grid-row', index + 1);
            for ( const showInfo in show) {  
                valueClassList.forEach((valueClassName) => {
                    labelClassList.forEach((labelClassName) => {
                        if (valueClassName.includes(showInfo) && (showInfo !== 'id') ) {

                            if(labelClassName.includes(showInfo)){
                                //Creating grid cell
                                const showGridCell = createElement('p', valueClassName);
                                
                                if (showInfo === 'date') {
                                    const date = displayShowDate(show[showInfo]);
                                    showGridCell.innerText = date;
                                } else {
                                    showGridCell.innerText = show[showInfo];
                                }
        
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

const gridRows = document.querySelectorAll('.shows__grid-row');
const classRowSelected = ('shows__grid-row--selected');
const classRowHovered = ('shows__grid-row--hovered')

let selectedRow = '';
gridRows.forEach((row, index) => {
    row.addEventListener('click', (e) => {
        selectedRow = index;
        row.classList.add(classRowSelected);

        //callback function
        if(deselectPrevSelectedRow) {
            deselectPrevSelectedRow(selectedRow)
        }
    })

    row.addEventListener('mouseover', (e) => {
        row.classList.add(classRowHovered);
    })

    row.addEventListener('mouseout', (e) => {
        row.classList.remove(classRowHovered);
    })
})

const deselectPrevSelectedRow = (param) => {
    gridRows.forEach((row, index) => {
        
        //Checking if row index !== selected row index and if the row already has class 'shows__grid-row--selected', the class is removed from the row
        if (index !== param && row.classList.contains(classRowSelected)) {
            row.classList.remove(classRowSelected);
        }
    })
}

