import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  }

  render() {
    const { books, onUpdateBook } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf shelfName='Currently Reading' shelfType='currentlyReading' books={books} onUpdateBook={onUpdateBook}/>
            <BookShelf shelfName='Want to Read' shelfType='wantToRead' books={books} onUpdateBook={onUpdateBook}/>
            <BookShelf shelfName='Read' shelfType='read' books={books} onUpdateBook={onUpdateBook}/>
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