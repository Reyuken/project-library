/*
constructor for books
function that takes arguments
    creates books
    store book object into an array
    books should have unique id
function that displays the books on their own container or "card"
    separate the display books and the book structure logic
New book button that displays a form to allow inputs about the book details
    should contain author, title, number of pages, was it read or not.
add remove button on each book
add button to change read status

*/

document.addEventListener("DOMContentLoaded", ()=>{

const dialog = document.getElementById("dialogBox");
const newBookBtn = document.getElementById("newBookBtn");
const closeBtn = document.getElementById("closeBtn");


newBookBtn.addEventListener("click", ()=>{
    dialog.showModal();
});
closeBtn.addEventListener("click", () => {
    dialog.close();
});

})