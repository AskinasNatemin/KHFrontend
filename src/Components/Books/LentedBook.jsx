import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "../../Styles/LentedBook.css";

const LentedBook = () => {
  const [isFlipMode, setIsFlipMode] = useState(false);

  const sampleBook = {
    image: "https://example.com/sample-book-cover.jpg",
    title: "Sample Book Title",
    author: "John Doe",
    description:
      "This is a sample book description that gives a brief overview of the book content.",
  };

  const handleFlipMode = () => {
    setIsFlipMode(!isFlipMode);
  };

  return (
    <div className="LentedBookContainer">
      {!isFlipMode && (
        <>
          <img
            src={sampleBook.image}
            alt={sampleBook.title}
            className="LentedBookImage"
          />
          <div className="LentedBookDetails">
            <h2 className="LentedBookTitle">{sampleBook.title}</h2>
            <p className="LentedBookAuthor">Author: {sampleBook.author}</p>
            <p className="LentedBookDescription">{sampleBook.description}</p>
            <button
              className="LentedBookReadMoreButton"
              onClick={handleFlipMode}
            >
              Open FlipBook
            </button>
          </div>
        </>
      )}

      {isFlipMode && (
        <div className="LentedBookFlipBook">
          <HTMLFlipBook
            width={400}
            height={500}
            size="stretch"
            drawShadow={true}
            showCover={true}
            mobileScrollSupport={true}
            useMouseEvents={true}
            flippingTime={700}
            autoSize={true}
            className="border border-5"
          >
            {/* Front Cover - Single Page */}
            <div className="LentedBookPage ">Front Cover</div>

            {/* Open Book - Left and Right Pages */}
            <div className="LentedBookPage">Left Page 1</div>
            <div className="LentedBookPage">Right Page 1</div>

            <div className="LentedBookPage">Left Page 2</div>
            <div className="LentedBookPage">Right Page 2</div>

            <div className="LentedBookPage">Left Page 3</div>
            <div className="LentedBookPage">Right Page 3</div>

            {/* Back Cover - Single Page */}
            <div className="LentedBookPage">Back Cover</div>
          </HTMLFlipBook>
          <button className="LentedBookReadMoreButton" onClick={handleFlipMode}>
            Close FlipBook
          </button>
        </div>
      )}
    </div>
  );
};

export default LentedBook;
