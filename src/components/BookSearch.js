import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class BookSearch extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		onUpdateBook: PropTypes.func.isRequired,
		onSearchBooks: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query });
		this.props.onSearchBooks(query);
	}

	render() {
		const { books, onUpdateBook } = this.props;
		const { query } = this.state;

		return (
			<div className="search-books">
				{books && books.map((book) => (console.log(book)))}
				<div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map((book) => (<Book key={book.id} book={book} onUpdateBook={onUpdateBook} />))}
					</ol>
				</div>
			</div>
		)
	}
}

export default BookSearch;