// filepath: src/redux/booksSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import { books as initialBooks } from '../data/books';

const loadBooks = () => {
  const data = localStorage.getItem('books');
  return data ? JSON.parse(data) : initialBooks;
};

const saveBooks = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: loadBooks(),
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push({ ...action.payload, id: state.books.length + 1 });
      saveBooks(state.books);
    },
  },
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;