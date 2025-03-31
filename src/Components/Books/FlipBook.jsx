import React from "react";
import "../../Styles/LentedBook/FlipBookPage.css";
import HTMLFlipBook from "react-pageflip";

const FlipBook = ({handleFlipMode}) => {
  return (
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
  );
};

export default FlipBook;
