const addBtn = document.querySelector('.add');
const modalContainer = document.querySelector('.modal-container');
const inputs = document.querySelectorAll('input');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');

addBtn.addEventListener('click', (e) => {
    showModal();
});

function showModal(){
    modalContainer.style.display = "flex";
}


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
