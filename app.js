// bookModel.js
class Book {
    constructor(title, author, genre, date, time) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.date = date;
        this.time = time;
    }
}

// bookController.js
class BookController {
    constructor() {
        this.books = [];
        this.favoriteBooks = [];
    }

    addBook(title, author, genre, date, time) {
        const newBook = new Book(title, author, genre, date, time);
        this.books.push(newBook);
        this.displayBooks(); // Add this line to display books after adding
    }

    addToFavorites(title, author, genre, date, time) {
        const newBook = new Book(title, author, genre, date, time);
        this.favoriteBooks.push(newBook);
        this.displayFavorites();
    }

    removeFromFavorites(index) {
        this.favoriteBooks.splice(index, 1);
        this.displayFavorites();
    }

    displayBooks() {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';
        this.books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `<span>Title:</span> ${book.title}<br>
                                  <span>Author:</span> ${book.author}<br>
                                  <span>Genre:</span> ${book.genre}<br>
                                  <span>Date:</span> ${book.date}<br>
                                  <span>Time:</span> ${book.time}<br>
                                  <button class="add-to-favorites" data-index="${index}">Add to Favorites</button>
                                  <button class="send-invitation" data-index="${index}">Send Invitation</button>`; // Added button
            bookList.appendChild(bookItem);
        });
    }

    displayFavorites() {
        const favoritesSection = document.getElementById('favorites');
        favoritesSection.innerHTML = '';
        this.favoriteBooks.forEach((book, index) => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.innerHTML = `<span>Title:</span> ${book.title}<br>
                                      <span>Author:</span> ${book.author}<br>
                                      <span>Genre:</span> ${book.genre}<br>
                                      <span>Date:</span> ${book.date}<br>
                                      <span>Time:</span> ${book.time}<br>
                                      <button class="remove-from-favorites" data-index="${index}">Remove</button>`; // Added button
            favoritesSection.appendChild(favoriteItem);
        });
    }
}

// Function to send invitations
function sendInvitation(title, author, date, time) {
    // Implement your logic here to send invitations
    alert(`Invitation sent for the event: ${title} by ${author} on ${date} at ${time}`);
}

// app.js
document.addEventListener('DOMContentLoaded', function () {
    const bookController = new BookController();

    const bookForm = document.getElementById('book-form');
    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;
        bookController.addBook(title, author, genre, date, time);
        bookController.displayBooks();
        bookForm.reset();
    });

    // Event delegation to handle adding to favorites
    document.getElementById('book-list').addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-favorites')) {
            const index = event.target.getAttribute('data-index');
            const { title, author, genre, date, time } = bookController.books[index];
            bookController.addToFavorites(title, author, genre, date, time);
        } else if (event.target.classList.contains('send-invitation')) {
            const index = event.target.getAttribute('data-index');
            const { title, author, date, time } = bookController.books[index];
            sendInvitation(title, author, date, time);
        }
    });

    // Event delegation to handle removing from favorites
    document.getElementById('favorites').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-favorites')) {
            const index = event.target.getAttribute('data-index');
            bookController.removeFromFavorites(index);
        }
    });
});