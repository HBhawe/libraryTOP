"use strict";

const myLibrary = [];

// query selectors
const tableContent = document.querySelector(".table-content");
const renderButton = document.querySelector(".render");
const newBookButton = document.querySelector(".new-book");
const tableSelector = document.querySelector("#myTable");
const rerenderButton = document.querySelector(".rerender-table");
const markReadButton = document.querySelector(".markRead");
const deleteBookButton = document.querySelector(".delete");
const newBookForm = document.querySelector(".new-book-form");
const closeModal = document.querySelector(".closeDialog");
const bookForm = document.querySelector("#book-form");
const submitForm = document.querySelector(".submitForm");

// BOOK CLASS
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readText = read === 1 ? "Read" : "Not read";
    this.id = crypto.randomUUID();
  }
}

// creating a book using the constructor
const addBookToLibrary = function (title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
};

const clearTable = function () {
  tableContent.innerHTML = "";
};

// render the table
const renderBooks = function () {
  myLibrary.forEach((book) => {
    let markup = `<tr class="generated-table-row"><td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.readText}</td><td><button class="${book.read === 1 ? "markUnread" : "markRead"}" data-id=${book.id}>${book.read === 1 ? "Mark as unread" : "Mark as read"}</button></td><td><button class="delete" data-id=${book.id}>Delete</button></td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", markup);
  });
};

// open the form
const renderForm = function () {
  newBookForm.showModal();
};

// render the table (clear and render from the variable)
const tableRender = function () {
  clearTable();
  renderBooks();
};

// mark a book as read
const markBookRead = function (id) {
  let index = myLibrary.findIndex((book) => book.id === id);
  myLibrary[index].read = 1;
  myLibrary[index].readText = "Read";
  tableRender();
};

// mark a book as read
const markBookUnread = function (id) {
  let index = myLibrary.findIndex((book) => book.id === id);
  myLibrary[index].read = 0;
  myLibrary[index].readText = "Unread";
  tableRender();
};

const deleteBook = function (id) {
  let bookIndex = id;
  let index = myLibrary.findIndex((book) => book.id === bookIndex);
  myLibrary.splice(index, 1);
  tableRender();
};

// EVENT LISTENERS
newBookButton.addEventListener("click", renderForm);

// trigger the mark as read or delete based on the button clicked
tableContent.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  if (e.target.classList.contains("markRead")) {
    markBookRead(id);
  } else if (e.target.classList.contains("delete")) {
    deleteBook(id);
  } else if (e.target.classList.contains("markUnread")) {
    markBookUnread(id);
  }
});

// "submitting the form"
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(bookForm, submitForm);
  const bookObject = {};
  for (const [key, value] of formData) {
    bookObject[key] = value;
  }
  addBookToLibrary(
    bookObject.title,
    bookObject.author,
    bookObject.pages,
    bookObject.read
  );
  bookForm.reset();
  newBookForm.close();
  tableRender();
});

// cancelling form submission
closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  bookForm.reset();
  newBookForm.close();
});
