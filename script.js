function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
  return (`${this.title} by ${this.author}, pages:${this.pages}`);
}

// ADD BOOKS TO LIST
const myLibrary = [];
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.unshift(book);
}

// SAVE MY LIBRARY TO LOCAL STORAGE
function saveToLocalStorage() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
}

// LOAD FROM LOCAL STORAGE
function loadFromLocalStorage() {
  const storedData = localStorage.getItem("library");

  if (!storedData) return;

  const parsedData = JSON.parse(storedData);

  myLibrary.length = 0; // clear array without changing reference

  parsedData.forEach(book => myLibrary.push(book));
}



// NEW BOOK BUTTON AND CANCEL BUTTON
const newBookBtn = document.querySelector(".new-book");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector(".cancel");
const modalForm = document.querySelector(".modal-form")

newBookBtn.addEventListener("click", () => {
  modal.showModal();
});
cancelBtn.addEventListener("click", () => {
  editingBookId = null;
  modalForm.reset();
  modal.close();
});

// SUBMIT MODAL FORM
const display = document.querySelector(".container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
let editingBookId = null;

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (editingBookId === null) {
    addBookToLibrary(title.value, author.value, pages.value, read.checked);
  } else {
    const book = myLibrary.find(b => b.id === editingBookId);
    if (!book) return;

    book.title = title.value;
    book.author = author.value;
    book.pages = pages.value;
    book.read = read.checked;

    editingBookId = null;
  }

  update();
  modal.close();
  modalForm.reset();
});

// DISPLAY
const displayBooks = () => {
  display.textContent = "";
  myLibrary.forEach((item) => {
    // BOOK CARD
    const newCard = document.createElement("div");
    newCard.classList.add("bookCard");
    newCard.dataset.id = item.id;

    // BOOK INFORMATION
    const newInfo = document.createElement("div");
    newInfo.classList.add("bookInfo");

    const bookTitle = document.createElement("h2");
    bookTitle.classList.add("bookTitle");
    bookTitle.textContent = item.title;

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.textContent = `- by ${item.author}`;

    const bookPages = document.createElement("div");
    bookPages.classList.add("bookPages");
    bookPages.textContent = `(${item.pages} pages)`;

    newInfo.appendChild(bookTitle);
    newInfo.appendChild(bookAuthor);
    newInfo.appendChild(bookPages);

    //REMOVE BUTTON
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBook");
    removeBtn.textContent = "x";

    //EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBook");
    editBtn.textContent = "Edit";

    //READ TOGGLE
    const isRead = document.createElement("button");
    isRead.classList.add("isRead");
    if (item.read === true) {
      isRead.textContent = "Already Read";
      isRead.classList.add("read");
    } else {
      isRead.textContent = "Not Yet Read";
    }

    newCard.appendChild(newInfo);
    newCard.appendChild(removeBtn);
    newCard.appendChild(editBtn);
    newCard.appendChild(isRead);

    display.appendChild(newCard);
  });
}

function update() {
  saveToLocalStorage();
  displayBooks();
}


// REMOVE CARD AND READ TOGGLE
display.addEventListener("click", (event) => {
  if (!event.target.matches(".removeBook, .isRead, .editBook")) return;

  const card = event.target.closest(".bookCard");
  const bookId = card.dataset.id;

  const index = myLibrary.findIndex((item) => item.id === bookId);
  if (index === -1) return;

  if (event.target.classList.contains("removeBook")) {
    const bookTitle = myLibrary[index].title;

    const confirmDelete = confirm(
      `Delete "${bookTitle}"?\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;
    myLibrary.splice(index, 1);
  }
  else if (event.target.classList.contains("isRead")) {
    myLibrary[index].read = !myLibrary[index].read;
  }
  //event.target.classList.contains("isRead") 
  else {
    const book = myLibrary[index];

    editingBookId = book.id;

    title.value = book.title;
    author.value = book.author;
    pages.value = book.pages;
    read.checked = book.read;

    modal.showModal();
    return;
  }

  update();
});

loadFromLocalStorage();

//DEMO BOOKS
if (myLibrary.length === 0) {
  addBookToLibrary("Demo Book 1", "Author A", 470, false);
  addBookToLibrary("Demo Book 2", "Author B", 340, true);
  addBookToLibrary("Demo Books appear whene there is no book added at all", "Author C", 634, false);
}


update();