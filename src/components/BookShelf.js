import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelfName: PropTypes.string.isRequired,
		shelfType: PropTypes.string.isRequired,
		onUpdateBook: PropTypes.func.isRequired
	}

	render() {
		const { books, shelfName, shelfType, onUpdateBook } = this.props;

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfName}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.filter((book) => book.shelf === shelfType).map((book) => (<Book key={book.id} book={book} onUpdateBook={onUpdateBook}/>))}
					</ol>
				</div>
			</div>
		)
	}
}

export default BookShelf;