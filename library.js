"use strict"

const library = [];

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