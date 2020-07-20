import React from 'react';
import { Route } from 'react-router-dom'
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };

  updateBook = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book.id, shelf).then(() => {
        book.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }));
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            onUpdateBook={this.updateBook}
            books={this.state.books}
          />
        )} />
        <Route path="/search" render={() => (
          <BookSearch 
            onUpdateBook={this.updateBook}
            books={this.state.books}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;
