# Library App

A simple library management app built with vanilla JavaScript.  
Users can add books, mark them as read or unread, and remove them.  
All data is persisted using browser localStorage.

This project focuses on DOM manipulation, state management, and clean UI structure without using any frameworks.

---

## Features

- Add new books with title, author, pages, and read status
- Toggle read / not-read status
- Delete books from the library
- Persistent data storage using localStorage
- Responsive grid-based layout
- Clean dark UI with clear visual hierarchy
- Edit existing books using the same modal form
- Cancel editing without modifying existing data

---

## Technologies Used

- HTML
- CSS (Flexbox, Grid, CSS variables)
- JavaScript (ES6+)
- Browser localStorage API

---

## What I Learned

- Managing application state using a single source of truth
- Persisting data with localStorage
- Separating data logic, UI rendering, and event handling
- Using event delegation for dynamically created elements
- Designing UI using role-based color systems instead of random colors
- Handling edit state safely using unique identifiers instead of array indexes

---

## Data Flow Overview

1. Application loads and restores data from localStorage
2. User actions update the in-memory library array
3. Changes are saved back to localStorage
4. UI re-renders from the updated data

This ensures consistent state and persistence across page reloads.

---

## Future Improvements

- Search and filter books
- Authentication and cloud sync
- Theme toggle (light / dark)

---

## Live Demo

https://abhirup-2005.github.io/library/

---

## Notes

This project was completed as part of The Odin Project curriculum.
