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

  updateBook = (book, shelf) => {    
    let updatedBooks = [];

    if(this.state.books.filter((b) => (b.id === book.id)).length > 0) {
      updatedBooks = this.state.books.map(function(b) {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      });      
    } else {
      book.shelf = shelf;
      updatedBooks = this.state.books.concat( [ book ]);
    }

    this.setState({ books: updatedBooks });

    BooksAPI.update({id: book.id}, shelf);
  }

  searchBooks(query) {
    if (query.length > 0) {
      BooksAPI.search(query, 20).then((searchResults) => {
        if (searchResults === undefined || searchResults.error) {
          this.setState({ searchResults: [] });
        }
        else {
          for (let resultBook of searchResults) {
            for (let book of this.state.books) {
              if (resultBook.id === book.id) {
                resultBook.shelf = book.shelf;
              }
            }
          }
        
          this.setState({ searchResults });
        }
      });
    }
    else {
      this.setState({ searchResults: [] });
    }
  }

  clearSearchResults() {
    this.setState({ searchResults: [] });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            onUpdateBook={this.updateBook}
            books={this.state.books}
            clearSearchResults={() => {
              this.clearSearchResults();
            }}
          />
        )} />
        <Route path="/search" render={() => (
          <BookSearch     
            onUpdateBook={this.updateBook}
            onSearchBooks={(query) => {
              this.searchBooks(query);
            }}
            searchResults={this.state.searchResults}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;
