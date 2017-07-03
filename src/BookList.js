import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired.array,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {books.map((book) => (console.log(book)))}
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'currentlyReading').map((book) => (<Book key={book.id} book={book} />))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'wantToRead').map((book) => (<Book key={book.id} book={book} />))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => book.shelf === 'read').map((book) => (<Book key={book.id} book={book} />))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BookList;