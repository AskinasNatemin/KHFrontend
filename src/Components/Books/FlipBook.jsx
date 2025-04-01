import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

import "../../Styles/LentedBook/FlipBookPage.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const FlipBook = ({ handleFlipMode, pdfUrl }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setPages([]); 
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const pageImages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 4; // Keeps high quality but not oversized
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          context.scale(1.2, 1.2); // Improves clarity

          await page.render({ canvasContext: context, viewport }).promise;

          pageImages.push(canvas.toDataURL("image/png")); // Convert to high-quality image
        }

        setPages(pageImages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    if (pdfUrl) loadPDF();
  }, [pdfUrl]);

  return (
    <div className="LentedBookFlipBookContainer">
      {pages.length > 0 && (
        <HTMLFlipBook
          key={pages.length}

          width={window.innerWidth < 600 ? 350 : 750} // Adjust width dynamically
          height={window.innerWidth < 600 ? 500 : 1000} // Ensures it fits in 100vh
          size="stretch"
          minWidth={300}
          minHeight={400}
          maxWidth={900}
          maxHeight={1000}
          drawShadow={true}
          showCover={true}
          mobileScrollSupport={false} // Prevents scrolling
          useMouseEvents={true}
          flippingTime={600}
          className="LentedBookFlipBook"
        >
          <div className="LentedFlipBookPage">Front Cover</div>

          {pages.map((image, index) => (
            <div key={index} className="LentedFlipBookPage">
              <img
                src={image}
                alt={`Page ${index + 1}`}
                className="LentedFlipBookImage"
              />
            </div>
          ))}

          <div className="LentedFlipBookPage">Back Cover</div>
        </HTMLFlipBook>
      )}

      <button className="LentedBookReadMoreButton" onClick={() => handleFlipMode()}>
        Close FlipBook
      </button>
    </div>
  );
};

export default FlipBook;
