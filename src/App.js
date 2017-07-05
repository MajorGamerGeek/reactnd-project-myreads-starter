import React from 'react';
import { Route } from 'react-router-dom'
import BookList from './components/BookList';
import BookSearch from './components/BookSearch';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };

  updateBook(book, shelf) {
    console.log(book + shelf);
    BooksAPI.update(book, shelf).then((booksInShelfs) => {
      // Todo: Add logic to update the books in what shelfs
      console.log(booksInShelfs);
    });
  }

  searchBooks(query) {
    if (query.length > 0) {
      BooksAPI.search(query, 20).then((searchResults) => {
        if (searchResults === undefined || searchResults.error) {
          this.setState({ searchResults: [] });
        }
        else {
          this.setState({ searchResults });
        }
      });
    }
    else {
      this.setState({ searchResults: [] });
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
            onSearchBooks={(query) => {
              this.searchBooks(query);
            }}
            books={this.state.searchResults}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;
