import React from 'react';
import { Route } from 'react-router-dom'
import BookList from './BookList';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
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

  updateBook(book) {
    BooksAPI.update(book).then(book => {
      this.setState(state => ({
        books: state.books
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList 
            onUpdateBook={this.updateBook} 
            books={this.state.books}/>
        )}/>
        <Route path="/search" render={() => (
          <BookSearch 
            onUpdateBook={this.updateBook} 
            books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
