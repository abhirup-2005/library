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

    //READ TOGGLE
    const isRead = document.createElement("button");
    isRead.classList.add("isRead");
    if(item.read === true) {
      isRead.textContent = "Read";
      isRead.style.backgroundColor = "lightgreen";
    } else {
      isRead.textContent = "Not Yeat Read";
      isRead.style.backgroundColor = "orange";
    }

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

//EXAMPLE
addBookToLibrary("Economics for Engineers", "Partha Chatterjee", 470, false);
addBookToLibrary("Economics for Engineers", "HL Bhatia & SN Maheshwari", 340, true);
addBookToLibrary("Data Structures and Algorithms in C and Python ", "Chandan Banerjee & Atanu Das", 634, false);
addBookToLibrary("Economics for Engineers", "Partha Chatterjee", 470, false);
addBookToLibrary("Economics for Engineers", "HL Bhatia & SN Maheshwari", 340, true);
addBookToLibrary("Economics for Engineers", "Partha Chatterjee", 470, false);
addBookToLibrary("Economics for Engineers", "HL Bhatia & SN Maheshwari", 340, true);
addBookToLibrary("Economics for Engineers", "Partha Chatterjee", 470, false);
addBookToLibrary("Economics for Engineers", "HL Bhatia & SN Maheshwari", 340, true);

displayBooks();