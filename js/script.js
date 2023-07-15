const addBtn = document.querySelector('.add');
const modalContainer = document.querySelector('.modal-container');
const inputs = document.querySelectorAll('input');
const submitBtn = document.querySelector('.submit');
const resetBtns = document.querySelectorAll('.reset');
const closeBtn = document.querySelector('img[alt="close"]');
const formAdd = document.querySelector('form#book_form');
const content = document.querySelector('.content');
const deleteBtn = document.querySelector('.delete');
const editContainer = document.querySelector('.edit-container');
const closeBtnEdit = document.querySelector('img[alt="close_edit"]');
const submitEditionBtn = document.querySelector('.edit_btn');
const modalEdit = document.querySelector('.modal-edit');
const formEdit = document.querySelector('form#book_form_edit'); 
const confirmationModalContainer = document.querySelector('.confirmation-container');
const confirmationModal = document.querySelector('.confirm-modal');
const yesBtn = document.querySelector('.yes-delete');
const noBtn = document.querySelector('.no-delete');
const totalP = document.querySelector('.total');
const readP = document.querySelector('.read-total');
const noReadP = document.querySelector('.non-read-total');

let myLibrary =[];

function Book(name, author, pages, read){
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read
}

Book.prototype.editBook = function(){
    this.name = inputs[4].value;
    this.author = inputs[5].value;
    this.pages = inputs[6].value;
    this.read = inputs[7].checked;
}

addBtn.addEventListener('click', (e) => {
    showModal();
});

function showModal(){
    modalContainer.style.display = "flex";
}

function showModalEdit(){
    editContainer.style.display = "flex";
}

function showConfirmationModal(){
    confirmationModalContainer.style.display = "flex";
}

function closeModal(){
    modalContainer.style.display = "none";
}

function closeEditModal(){
    editContainer.style.display = "none";
}

function closeConfirmationModal() {
    confirmationModalContainer.style.display = "none";
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

resetBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
    inputs.forEach((input) =>{
        input.classList.remove('focused');
        })
    })  
})

closeBtn.addEventListener('click', (e) => {
    closeModal();
})

closeBtnEdit.addEventListener('click', (e) => {
    closeEditModal();
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (formAdd.checkValidity()){
        let book = new Book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].checked);
        addToLibrary(book);
        showLibrary();
        updateLog();
        resetBtns[0].click();
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
        if (myLibrary[i].read === true){
            book.classList.add('read');
        }
        else{
            book.classList.remove('read');
        }
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

    editBtn.addEventListener('click', (e) => {
        showModalEdit();
        let indexNum = e.target.parentElement.parentElement.getAttribute('data-index');
        fillInputsWithData(indexNum);
        focusInputs();
        toggleIndexToModal(indexNum);
    })

    deleteBtn.addEventListener('click', (e) => {
        showConfirmationModal();
        let indexNum = e.target.parentElement.parentElement.getAttribute('data-index');
        toggleIndexToConfirmationModal(indexNum);
    })

    bookElement.appendChild(h3);
    bookElement.appendChild(divOfInfo);
    divOfInfo.appendChild(h4Author);
    divOfInfo.appendChild(h4Pages);
    bookElement.appendChild(options);
    options.appendChild(editBtn);
    options.appendChild(deleteBtn);
}

function fillInputsWithData(indexNum) {
    inputs[4].value = myLibrary[indexNum].name;
    inputs[5].value = myLibrary[indexNum].author;
    inputs[6].value =  myLibrary[indexNum].pages;
    if (myLibrary[indexNum].read === true){
        inputs[7].checked = true;
    }
    else{
        inputs[7].checked = false;
    }
}

function focusInputs(){
    for (let i = 4; i < inputs.length; i++){
        inputs[i].classList.add('focused');
    }
}

submitEditionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (formEdit.checkValidity()){
        let book = myLibrary[e.target.parentElement.parentElement.getAttribute('data-num')];
        console.log(e.target);
        book.editBook();
        showLibrary();
        updateLog();
        closeEditModal();
    }
    else{
        showError();
    }
})


function toggleIndexToModal(indexNum){
    modalEdit.setAttribute('data-num', `${indexNum}`);
}

function toggleIndexToConfirmationModal(indexNum){
    confirmationModal.setAttribute('data-num', `${indexNum}`);
}

function deleteBook(indexNum){
    myLibrary.splice(indexNum, 1);
}

yesBtn.addEventListener('click', (e) =>{
    let indexNum = e.target.parentElement.parentElement.getAttribute('data-num');
    deleteBook(indexNum)
    closeConfirmationModal();
    showLibrary();
    updateLog();
})

noBtn.addEventListener('click', (e) => {
    closeConfirmationModal();
})

function updateLog(){
    totalP.textContent = `total book counts: ${myLibrary.length}`;

    let readBooks = myLibrary.filter((book) => {
        if (book.read === true){
            return true;
        }
    });
    let nonReadBooks = myLibrary.filter((book) => {
        if (book.read === false){
            return true;
        }
    });

    readP.textContent = `Read: ${readBooks.length}`;
    noReadP.textContent = `Not Read: ${nonReadBooks.length}`;
}    