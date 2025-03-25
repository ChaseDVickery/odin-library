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

addBookToLibrary("My book", "Bob", 231, true);
addBookToLibrary("Another Title", "Sally", 456, true);
addBookToLibrary("My book 2", "Bob", 167, false);

console.log(library);


// DOM organization
const libraryDisplay = document.querySelector(".library");
const bookDisplayTemplate = document.querySelector("#book-card-base");
bookDisplayTemplate.remove();
bookDisplayTemplate.id = null;

function displayCard(card, book) {
    const titleElement = card.querySelector(".title");
    const authorElement = card.querySelector(".author");

    titleElement.textContent = book.title;
    authorElement.textContent = book.author;
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