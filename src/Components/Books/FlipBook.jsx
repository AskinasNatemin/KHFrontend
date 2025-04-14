import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Styles/LentedBook/FlipBookPage.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const FlipBook = ({ handleFlipMode, pdfUrl: propPdfUrl }) => {
  const [pages, setPages] = useState([]);
  const [bookSize, setBookSize] = useState({ width: 750, height: 1000 });
  const hasLoadedPDF = useRef(false); // ✅ Prevent duplicate loads
  const navigate = useNavigate();
  const location = useLocation();

  const locationPdfPath = location.state?.pdfUrl;

  const pdfUrl =
    propPdfUrl || (locationPdfPath ? `http://localhost:5001/${locationPdfPath}` : null);

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
      if (!pdfUrl || hasLoadedPDF.current) return;

      hasLoadedPDF.current = true;
      console.log("Loading PDF:", pdfUrl);

      try {
        setPages([]);
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

        const pageImages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 4;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d", { alpha: false });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport,
            intent: "print",
          };

          await page.render(renderContext).promise;
          pageImages.push(canvas.toDataURL("image/png"));
        }

        setPages(pageImages);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPDF();
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
            <div key={`page-${index}`} className="LentedFlipBookPage">
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

      <button
        className="LentedBookCloseButton"
        onClick={() => {
          if (locationPdfPath) {
            return navigate("/ViewBooks");
          }
          handleFlipMode();
        }}
      >
        Close Book
      </button>
    </div>
  );
};

export default FlipBook;
