"use strict";
const myLibrary = [];

// query selector
const tableContent = document.querySelector(".table-content");
const renderButton = document.querySelector(".render");
const newBookButton = document.querySelector(".new-book");
const tableSelector = document.querySelector("#myTable");
const rerenderButton = document.querySelector(".rerender-table");
const markReadButton = document.querySelector(".markRead");
const deleteBookButton = document.querySelector(".delete");

// BOOK constructor
const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.readText = read === 1 ? "Read" : "Not read";
  this.id = crypto.randomUUID();
};

// creating a book using the constructor
const addBookToLibrary = function (title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
};

// render the table
const renderBooks = function () {
  myLibrary.forEach((book) => {
    let html = `<tr><td>${book.title}</td><td>${book.author}</td><td>${book.pages}</td><td>${book.readText}</td><td><button class="markRead" data-id=${book.id}>Mark as read</button></td><td><button class="delete" data-id=${book.id}>Delete</button></td></tr>`;
    tableContent.insertAdjacentHTML("beforeend", html);
  });
};

const renderForm = function () {
  console.log(`form rendered`);
};

const markBookRead = function (id) {
  //   array manipulation here
  // find by id and set the read flag and text
};

const deleteBook = function (id) {
  //   array manipulation here
  // find by id and "pop" that element
};

// EVENT LISTENERS
renderButton.addEventListener("click", renderBooks);
newBookButton.addEventListener("click", renderForm);

tableContent.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  console.log(id);
  if (e.target.classList.contains("markRead")) {
    markBookRead(id);
  } else if (e.target.classList.contains("delete")) {
  }
});
