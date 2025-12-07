document.addEventListener("DOMContentLoaded", ()=>{

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

const myLibrary = [];

// --- Load saved data ---
const saved = JSON.parse(localStorage.getItem("myLibrary"));
if (saved) {
  saved.forEach(b => {
    const book = new Book(b.author, b.title, b.pages, b.read);
    book.id = b.id; // keep IDs
    myLibrary.push(book);
  });
}

function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function renderLibrary() {
  const container = document.getElementById('container');
  container.innerHTML = "";

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

    card.querySelector('.toggle-read').addEventListener('click', () => {
      book.toggleRead();
      saveLibrary();
      renderLibrary();
    });

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
    saveLibrary();
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

const form = document.getElementById("input");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const pageNumber = document.getElementById("pageNumber").value;
    const read = document.getElementById("readCheck").checked;

    const newBook = new Book(author,title,pageNumber,read);
    
    myLibrary.push(newBook);
    saveLibrary();
    renderLibrary();

    form.reset();
    dialog.close();
});

// --- Render where loading completes ---
renderLibrary();

});
