
document.addEventListener("DOMContentLoaded", ()=>{
const myLibrary = [];

class Book{
    constructor(author,title,pages,read){
        this.id = crypto.randomUUID();
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
    this.read = !this.read;
  }
}

function renderLibrary() {
  const container = document.getElementById('container');
  container.innerHTML = ""; // Clear previous display

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status: ${book.read ? "Read" : "Not Read"}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>`;
    

    // Toggle read button
    card.querySelector('.toggle-read').addEventListener('click', () => {
      book.toggleRead();
      renderLibrary();
    });

    // Remove book button
    card.querySelector('.remove-book').addEventListener('click', () => {
      removeBookById(book.id);
    });

    container.appendChild(card);
  });
}

function removeBookById(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

const dialog = document.getElementById("dialogBox");
const newBookBtn = document.getElementById("newBookBtn");
const closeBtn = document.getElementById("closeBtn");


newBookBtn.addEventListener("click", ()=>{
    dialog.showModal();
});
closeBtn.addEventListener("click", () => {
    dialog.close();
});

//Submit data fom input form
const form = document.getElementById("input");

form.addEventListener("submit",function(e){
    e.preventDefault();

    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pageNumber = document.getElementById("pageNumber").value;
    const read = document.getElementById("readCheck").checked;

    const newBook = new Book(author,title,pageNumber,read);
    
    myLibrary.push(newBook);
    console.log(myLibrary);
    renderLibrary();
    form.reset();
    dialog.close();

})

})
