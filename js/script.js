const addBtn = document.querySelector('.add');
const modalContainer = document.querySelector('.modal-container');
const inputs = document.querySelectorAll('input');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');
const closeBtn = document.querySelector('img[alt="close"]');
const form = document.querySelector('form');

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
        console.log(myLibrary)
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

}

function showError(){
    Array.from(inputs).reverse().forEach((input) => {
        if (!input.validity.valid){
            input.reportValidity();
        }
    })

}