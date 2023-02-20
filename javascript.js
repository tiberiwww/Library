class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = Boolean(isRead);
  }
}

class Libray {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  changeIsRead(title) {
    let book = this.books.find((book) => book.title === title);
    if (book.isRead === true) {
      book.isRead = false;
    } else {
      book.isRead = true;
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }

  getLibrary() {
    return this.books;
  }
}

const library = new Libray();

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "301", true);

const theCreativeAct = new Book(
  "The Creative Act: A Way of Being",
  "Rick Rubin",
  "432",
  true
);
library.addBook(theCreativeAct);
library.addBook(theHobbit);

console.log(library.getLibrary());
// let localStorageLibrary = JSON.parse(localStorage.getItem("library"));
function displayLibrary() {
  if (
    JSON.parse(localStorage.getItem("library")) !== null &&
    JSON.parse(localStorage.getItem("library")).length > 2
  ) {
    // console.log(JSON.parse(localStorage.getItem("library")));
    library.books = JSON.parse(localStorage.getItem("library"));
    // console.log(library.books);
    displayBook(library);
  } else {
    displayBook(library);
  }
}

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.querySelector(".btn-addBook");

// Get read buttons
// let btnsRead;

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";

  modal.firstElementChild.firstElementChild.firstElementChild.innerHTML =
    "Add book";
};

// When the user clicks anywhere outside of the modal, close it
window.onmousedown = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("book-form").reset();
  }
};

let newBook;

// FORM
function getData(form) {
  let formData = new FormData(form);

  let book = Object.fromEntries(formData);

  if (
    modal.firstElementChild.firstElementChild.firstElementChild.innerHTML ===
    "Add book"
  ) {
    newBook = new Book(book.title, book.author, book.pages, book.isRead);

    //local storage

    library.addBook(newBook);
    localStorage.setItem("library", JSON.stringify(library.books));
  } else {
    editBook = library.getBook(targetBookTitle.innerHTML.trim());
    editBook.title = book.title;
    editBook.author = book.author;
    editBook.pages = book.pages;
    if (book.isRead == undefined) {
      editBook.isRead = false;
    } else {
      editBook.isRead = true;
    }
    // editBook.isRead = book.isRead;
    targetBookTitle.innerHTML = book.title;
    targetBookTitle.nextElementSibling.innerHTML = book.author;
    targetBookTitle.nextElementSibling.nextElementSibling.innerHTML =
      book.pages + " pages";

    let titleRead =
      targetBookTitle.nextElementSibling.nextElementSibling.nextElementSibling
        .firstElementChild.firstElementChild;

    if (book.isRead) {
      titleRead.innerHTML = "Read";
      titleRead.style.backgroundColor = "#9fff9c";
    } else {
      titleRead.innerHTML = "Not read";
      titleRead.style.backgroundColor = "#ff9c9c";
    }

    localStorage.setItem("library", JSON.stringify(library.books));
  }

  console.log(library);
}

//

function displayBook(library) {
  divLibrary = document.querySelector(".library");
  if (document.querySelector(".library")) {
    document.querySelector(".library").textContent = "";
    for (let index = 0; index < library.books.length; index++) {
      let classBook = "book" + (index + 1);

      let divBook = document.createElement("div");
      divBook.className = "book";
      divBook.classList.add(classBook);
      divLibrary.appendChild(divBook);

      let divTitle = document.createElement("div");
      divTitle.innerHTML = library.books[index].title;
      divTitle.className = "book-title";
      divBook.appendChild(divTitle);

      let divAuthor = document.createElement("div");
      divAuthor.innerHTML = library.books[index].author;
      divAuthor.className = "book-author";
      divBook.appendChild(divAuthor);

      let divPages = document.createElement("div");
      divPages.innerHTML = library.books[index].pages + " pages";
      divPages.className = "book-pages";
      divBook.appendChild(divPages);

      let divButtons = document.createElement("div");
      divButtons.className = "book-buttons";
      divBook.appendChild(divButtons);

      let divIsRead = document.createElement("div");
      divIsRead.className = "isRead";
      divButtons.appendChild(divIsRead);

      let btnRead = document.createElement("button");
      if (library.books[index].isRead) {
        btnRead.innerHTML = "Read";
        btnRead.style.backgroundColor = "#9fff9c";
      } else {
        btnRead.innerHTML = "Not Read";
        btnRead.style.backgroundColor = "#ff9c9c";
      }

      btnRead.className = "book-read";
      divIsRead.appendChild(btnRead);

      let divBookInteract = document.createElement("div");
      divBookInteract.className = "book-interact";
      divButtons.appendChild(divBookInteract);

      ////

      let divEdit = document.createElement("div");
      divEdit.className = "edit";
      divBookInteract.appendChild(divEdit);

      let btnEdit = document.createElement("button");

      btnEdit.className = "btn-edit";
      btnEdit.innerHTML = "Edit";
      divEdit.appendChild(btnEdit);

      ////

      let divRemove = document.createElement("div");
      divRemove.className = "remove";
      divBookInteract.appendChild(divRemove);

      let btnRemove = document.createElement("button");

      btnRemove.className = "btn-remove";
      btnRemove.innerHTML = "Remove";
      divRemove.appendChild(btnRemove);
    }
  }
}

// Modal Form Create Book and Display

let divLibrary;

document.getElementById("book-form").addEventListener("submit", function (e) {
  modal.style.display = "none";
  e.preventDefault();
  getData(e.target);
  document.getElementById("book-form").reset();
  if (
    modal.firstElementChild.firstElementChild.firstElementChild.innerHTML ===
    "Add book"
  ) {
    if (
      JSON.parse(localStorage.getItem("library")) !== null &&
      JSON.parse(localStorage.getItem("library")).length > 0
    ) {
      // console.log(JSON.parse(localStorage.getItem("library")));
      library.books = JSON.parse(localStorage.getItem("library"));
      // console.log(library.books);
      displayBook(library);
    } else {
      displayBook(library);
    }
  }
});
// console.log(JSON.parse(localStorage.getItem("library")).length);
let libraryContainer = document.querySelector(".library");
let targetBookTitle;

libraryContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-remove")) {
    e.target.closest(".book").remove();
    library.removeBook(
      e.target.closest(".book").querySelector(".book-title").innerHTML
    );
    localStorage.setItem("library", JSON.stringify(library.books));
  }

  if (e.target.classList.contains("book-read")) {
    let title =
      e.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML.trim();

    library.changeIsRead(title);
    localStorage.setItem("library", JSON.stringify(library.books));

    if (e.target.innerHTML == "Read") {
      e.target.innerHTML = "Not read";
      e.target.style.backgroundColor = "#ff9c9c";
    } else {
      e.target.innerHTML = "Read";
      e.target.style.backgroundColor = "#9fff9c";
    }
  }

  if (e.target.classList.contains("btn-edit")) {
    modal.style.display = "block";
    modal.firstElementChild.firstElementChild.firstElementChild.innerHTML =
      "Edit book";

    let formTitle = document.querySelector("#title");
    targetBookTitle = e.target.closest(".book").querySelector(".book-title");
    formTitle.value = targetBookTitle.innerHTML.trim();

    let formAuthor = document.querySelector("#author");
    formAuthor.value = e.target
      .closest(".book")
      .querySelector(".book-author")
      .innerHTML.trim();

    let formPages = document.querySelector("#pages");
    formPages.value = e.target
      .closest(".book")
      .querySelector(".book-pages")
      .innerHTML.replace(/\D/g, "");

    let formRead = document.querySelector("#isRead");
    if (
      e.target
        .closest(".book-buttons")
        .querySelector(".book-read")
        .innerHTML.trim() === "Read"
    ) {
      formRead.checked = true;
    } else {
      formRead.checked = false;
    }
  }
});
displayLibrary();
