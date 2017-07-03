import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Book from './Book';

class BookSearch extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
        const { books } = this.props;
        const { query } = this.state;

        let showingBooks;

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingBooks = books.filter((book) => (match.test(book.title) || match.test(book.authors)));
        } else {
            showingBooks = books;
        }

        showingBooks.sort(sortBy('name'));

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (<Book key={book.id} book={book}/>))}
                    </ol>
                </div>
                {showingBooks.length !== books.length && (
                    <div className='showing-books'>
                        <span>Now showing {showingBooks.length} of {books.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
            </div>
        )
    }
}

export default BookSearch;