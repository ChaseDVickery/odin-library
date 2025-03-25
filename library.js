"use strict"

const library = [];
const libraryCards = [];

// START Book
function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id         = crypto.randomUUID();
    this.title      = title;
    this.author     = author;
    this.numPages   = numPages;
    this.read       = read;
}
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read ? 'read' : 'not read yet'}`;
}
// END Book

function addBookToLibrary(title, author, numPages, read) {
    const newBook = new Book(title, author, numPages, read);
    library.push(newBook);
}

for (let j = 0; j < 10; j++) {
    addBookToLibrary(`Book ${j}`, `Author ${j}`, 111 + Math.floor(Math.random() * 150), true);    
}

console.log(library);


// DOM organization
const libraryDisplay        = document.querySelector(".library");
const bookDisplayTemplate   = document.querySelector("#book-card-base");
const addBookButton         = document.querySelector("#add-book-btn");
const addBookDialog         = document.querySelector("#add-book-dialog");
const addTitleInput         = document.querySelector("#add-title-input");
const addAuthorInput        = document.querySelector("#add-author-input");
const addPagesInput         = document.querySelector("#add-pages-input");
const addReadInput          = document.querySelector("#add-read-input");
const confirmNewBookButton  = document.querySelector("#addConfirmBtn");
const cancelNewBookButton   = document.querySelector("#cancelConfirmBtn");
// Organization
bookDisplayTemplate.remove();
bookDisplayTemplate.id = null;
// Listeners
addBookButton.addEventListener("click", () => addBookDialog.showModal());
confirmNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewBookFromDialog();
    addBookDialog.close();
});

function addNewBookFromDialog(e) {
    console.log("addReadInput.checked: " + addReadInput.checked);
    addBookToLibrary(addTitleInput.value, addAuthorInput.value, addPagesInput.value, addReadInput.checked);
    displayLibrary();
}


// Display
function displayCard(card, book) {
    const titleElement  = card.querySelector(".title");
    const authorElement = card.querySelector(".author");
    // const cardElement   = card.querySelector(".book-card");

    titleElement.textContent = book.title;
    authorElement.textContent = `${book.author} (${book.numPages})`;
    if (book.read) {
        card.classList.add("read");
    }
}
function removeLastCard() {
    libraryCards.removeChild(libraryDisplay.lastChild);
    libraryDisplay.removeChild(libraryDisplay.lastChild);
}
function addNewCardDisplay() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
    const newDisplay = bookDisplayTemplate.cloneNode(true);
    libraryDisplay.appendChild(newDisplay);
    libraryCards.push(newDisplay);
}

function displayLibrary() {
    // Correct the number of displays
    while (libraryCards.length > library.length) { removeLastCardDisplay(); }
    while (libraryCards.length < library.length) { addNewCardDisplay(); }
    // Modify all card content to match library
    for (let i = 0; i < library.length; i++) {
        displayCard(libraryCards[i], library[i]);
    }
}

displayLibrary();