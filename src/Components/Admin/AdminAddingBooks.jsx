import React from 'react'

export const AdminAddingBooks = () => {
  return (
    <div className="add-book-container">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Book Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={book.title}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={book.author}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="genre">Genre:</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    value={book.genre}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="isbn">ISBN Number:</label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleInputChange}
                    required
                />

                <label htmlFor="publicationYear">Publication Year:</label>
                <input
                    type="number"
                    id="publicationYear"
                    name="publicationYear"
                    value={book.publicationYear}
                    onChange={handleInputChange}
                    min="1000"
                    max="9999"
                    required
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={book.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                />

                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};
  
