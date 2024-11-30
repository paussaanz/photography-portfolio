import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry"; // Import the worker

const PdfViewer = ({ file }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null); // Reuse a single canvas
  const [scale, setScale] = useState(1.5);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(file);
        const pdf = await loadingTask.promise;

        setNumPages(pdf.numPages); // Set total number of pages

        // Render the current page
        await renderPage(pdf, currentPage);
      } catch (error) {
        console.error("Error loading PDF:", error);
        setError("Failed to load PDF. Please try again.");
      }
    };

    const renderPage = async (pdf, pageNumber) => {
      try {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale });

        // Reuse the canvas element
        if (!canvasRef.current) {
          const canvas = document.createElement("canvas");
          canvasRef.current = canvas;
          if (containerRef.current) containerRef.current.appendChild(canvas);
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Adjust canvas size
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render page to canvas
        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error rendering page:", error);
        setError("Failed to render the page. Please try again.");
      }
    };

    loadPdf();
  }, [file, scale, currentPage]); // Re-run when file, scale, or currentPage changes

  return (
    <div>
      {/* Page Navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          marginTop: "200px",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, numPages))}
          disabled={currentPage === numPages}
        >
          Next
        </button>
      </div>

      {/* PDF Display */}
      {error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : (
        <div
          ref={containerRef}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </div>
  );
};

export default PdfViewer;
