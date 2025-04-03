import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

import "../../Styles/LentedBook/FlipBookPage.css";
import { useLocation } from "react-router-dom";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const FlipBook = ({ handleFlipMode , pdfUrl }) => {
  const [pages, setPages] = useState([]);
  const [bookSize, setBookSize] = useState({ width: 750, height: 1000 });
  const location =useLocation()
  // const pdfUrl1=location?.state.pdfUrl
  // console.log(pdfUrl1);  
  
  
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 600) {
        setBookSize({ width: 350, height: 500 });
      } else {
        setBookSize({ width: 750, height: 1000 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setPages([]);
        const pdf = await pdfjsLib.getDocument( pdfUrl).promise;
        console.log(pdf);
        
        const pageImages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 4; // Further increased scale for sharper text
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d", { alpha: false });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
            intent: "print", // Helps in rendering high-quality text
          };
          await page.render(renderContext).promise;
          pageImages.push(canvas.toDataURL("image/png"));
        }

        setPages(pageImages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    if (pdfUrl ) loadPDF();
  }, [pdfUrl]);

  return (
    <div className="LentedBookFlipBookContainer">
      {pages.length > 0 && (
        <HTMLFlipBook
          width={bookSize.width}
          height={bookSize.height}
          size="stretch"
          minWidth={300}
          minHeight={400}
          maxWidth={900}
          maxHeight={1000}
          drawShadow={true}
          showCover={true}
          mobileScrollSupport={false}
          useMouseEvents={true}
          flippingTime={600}
          className="LentedBookFlipBook"
        >
          <div className="LentedFlipBookPage">Front Cover</div>

          {pages.map((image, index) => (
            <div key={index} className="LentedFlipBookPage">
              <img src={image} alt={`Page ${index + 1}`} className="LentedFlipBookImage" />
            </div>
          ))}

          <div className="LentedFlipBookPage">Back Cover</div>
        </HTMLFlipBook>
      )}

      <button className="LentedBookReadMoreButton" onClick={handleFlipMode}>
        Close FlipBook
      </button>
    </div>
  );
};

export default FlipBook;