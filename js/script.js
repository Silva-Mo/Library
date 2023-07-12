const addBtn = document.querySelector('.add');
const modalContainer = document.querySelector('.modal-container');
const inputs = document.querySelectorAll('input');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');
const closeBtn = document.querySelector('img[alt="close"]');
const form = document.querySelector('form');
const content = document.querySelector('.content');


let myLibrary =[];

function Book(name, author, pages, read){
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
}

addBtn.addEventListener('click', (e) => {
    addBtn.classList.toggle('clicked')
    showModal();
});

function showModal(){
    modalContainer.style.display = "flex";
}

function closeModal(){
    modalContainer.style.display = "none";
}

let invalidChars = [
    "-",
    "+",
    "e",
  ];

inputs[2].addEventListener('keydown', (e) => {
    if (invalidChars.includes(e.key)) {
        e.preventDefault();
    }
})

inputs.forEach((input) => {
    input.addEventListener('focus', (e) => {
        input.classList.add('focused');
    })

    input.addEventListener('blur', (e) => {
        if (input.value === "" || input.value === null){
            input.classList.remove('focused');
        }
        else {
            e.preventDefault();
        }
    })    
})

resetBtn.addEventListener('click', (e) => {
    inputs.forEach((input) =>{
        input.classList.remove('focused');
    })
})

closeBtn.addEventListener('click', (e) => {
    closeModal();
})


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (form.checkValidity()){
        let book = new Book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
        addToLibrary(book);
        showLibrary();
        resetBtn.click();
        closeModal();    
    }
    else{
        showError();
    }
})

function addToLibrary(book) {
    myLibrary.push(book);
}

function showLibrary(){
    const books = document.querySelectorAll('div[data-index]');
    books.forEach((book) => {
        content.removeChild(book);
    })

    for(let i = 0; i < myLibrary.length; i++){
        let book = document.createElement('div');
        book.setAttribute('data-index', `${i}`);
        addBookData(myLibrary[i], book);
        content.appendChild(book);
    }
}

function showError(){
    Array.from(inputs).reverse().forEach((input) => {
        if (!input.validity.valid){
            input.reportValidity();
        }
    })
}

function addBookData(bookObj, bookElement){
    const h3 = document.createElement('h3');
    const divOfInfo = document.createElement('div');
    const h4Author = document.createElement('h4');
    const h4Pages = document.createElement('h4');
    const options = document.createElement('div');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    divOfInfo.classList.add('info-container');
    options.classList.add('options-div');
    deleteBtn.classList.add('delete');
    editBtn.classList.add('edit');

    h3.textContent = `${bookObj.name}`;
    h4Author.textContent = `Author: ${bookObj.author}`;
    h4Pages.textContent = `${bookObj.pages} Pages`;
    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    bookElement.appendChild(h3);
    bookElement.appendChild(divOfInfo);
    divOfInfo.appendChild(h4Author);
    divOfInfo.appendChild(h4Pages);
    bookElement.appendChild(options);
    options.appendChild(editBtn);
    options.appendChild(deleteBtn);
}