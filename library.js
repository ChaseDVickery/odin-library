"use strict"

const library = [];
// const libraryCards = [];

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
Book.prototype.toggleRead = function() {
    console.log(`Changing book (${this.id}) read status: ${this.read} -> ${!this.read}`);
    this.read = !this.read;
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

    card.dataset.bookid = book.id;
    titleElement.textContent = book.title;
    authorElement.textContent = `${book.author} (${book.numPages})`;
    if (book.read) {
        card.classList.add("read");
    } else {
        card.classList.remove("read");
    }
}
function getBookIndexFromCard(card) {
    return library.findIndex((element) => element.id.toString() === card.dataset.bookid);
}
function removeBookWithCard(card) {
    const index = getBookIndexFromCard(card);
    if (index < 0) { return; }
    library.splice(index, 1);
    displayLibrary();
}
function toggleReadBookWithCard(card) {
    console.log("toggleReadBookWithCard");
    const index = getBookIndexFromCard(card);
    if (index < 0) { return; }
    console.log("toggleReadBookWithCard found at index: " + index);
    library[index].toggleRead();
    displayLibrary();
}


function removeLastCardDisplay() {
    // libraryCards.(libraryDisplay.lastChild);
    libraryDisplay.removeChild(libraryDisplay.lastChild);
}
// function removeLastCardDisplay() {
//     libraryDisplay.removeChild(libraryDisplay.lastChild);
// }
function addNewCardDisplay() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
    const newDisplay = bookDisplayTemplate.cloneNode(true);
    libraryDisplay.appendChild(newDisplay);
    // libraryCards.push(newDisplay);

    const removeButton  = newDisplay.querySelector(".remove-btn");
    removeButton.addEventListener("click", (e) => {
        removeBookWithCard(newDisplay);
    });
    const toggleButton  = newDisplay.querySelector(".toggle-btn");
    toggleButton.addEventListener("click", (e) => {
        toggleReadBookWithCard(newDisplay);
    });
}

function displayLibrary() {
    // Correct the number of displays
    while (libraryDisplay.childElementCount > library.length) { removeLastCardDisplay(); }
    while (libraryDisplay.childElementCount < library.length) { addNewCardDisplay(); }
    // Modify all card content to match library
    for (let i = 0; i < library.length; i++) {
        displayCard(libraryDisplay.children[i], library[i]);
    }
}

displayLibrary();