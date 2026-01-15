function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.info = function () {
  return (`${this.title} by ${this.author}, ${this.pages} pages`);
}

// ADD BOOKS TO LIST
const myLibrary = [];
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
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
  modal.close();
});

// SUBMIT MODAL FORM
const display = document.querySelector(".container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, read.checked);

  display.textContent = "";
  displayBooks();

  modal.close();
  modalForm.reset();
});

// DISPLAY
const displayBooks = () => {
  myLibrary.forEach((item) => {
    // BOOK CARD
    const newCard = document.createElement("div");
    newCard.classList.add("bookCard");
    newCard.dataset.id = item.id;

    // BOOK INFORMATION
    const newInfo = document.createElement("div");
    newInfo.classList.add("bookInfo");

    //REMOVE BUTTON
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBook");

    //READ TOGGLE
    const isRead = document.createElement("button");
    isRead.classList.add("isRead");

    newInfo.textContent = item.info();
    removeBtn.textContent = "Remove";
    isRead.textContent = item.read === true ? "Read" : "Not Yet Read";

    newCard.appendChild(newInfo);
    newCard.appendChild(removeBtn);
    newCard.appendChild(isRead);

    display.appendChild(newCard);
  });
}

// REMOVE CARD AND READ TOGGLE
display.addEventListener("click", (event) => {
  if (!event.target.matches(".removeBook, .isRead")) return;

  const card = event.target.closest(".bookCard");
  const bookId = card.dataset.id;

  const index = myLibrary.findIndex((item) => item.id === bookId);
  if (index === -1) return;

  if(event.target.classList.contains("removeBook")) 
    myLibrary.splice(index, 1);
  else 
    myLibrary[index].read = !myLibrary[index].read;

  display.textContent = "";
  displayBooks();
});