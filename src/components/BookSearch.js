import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from '../utils/BooksAPI';

class BookSearch extends Component {
	static propTypes = {
		onUpdateBook: PropTypes.func.isRequired,
		books: PropTypes.array.isRequired
	}

	state = {
		query: '',
		searchResults: ''
	}

	searchBooks(query) {
		if (query.length > 0) {
      BooksAPI.search(query, 20).then((searchResults) => {
				console.log(searchResults);
        if (searchResults === undefined || searchResults.error) {
          this.setState({ searchResults: [] });
        }
        else {
          for (let resultBook of searchResults) {
            var bookMatch = this.props.books.filter(book => (resultBook.id === book.id));
            
            if(bookMatch[0] !== undefined) {
               resultBook.shelf = bookMatch[0].shelf;
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
		
	updateQuery = (query) => {
		this.setState({ query });
		this.searchBooks(query);
	}

	render() {
		const { onUpdateBook } = this.props;
		const { query, searchResults } = this.state;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author"
							autoFocus
							value={query}
							onChange={(event) => this.updateQuery(event.target.value)} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{query === '' || searchResults === '' ? null : searchResults.map((book) => (<Book key={book.id} book={book} onUpdateBook={onUpdateBook} />))}
					</ol>
				</div>
			</div>
		)
	}
}

export default BookSearch;