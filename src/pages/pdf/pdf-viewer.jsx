import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry"; // Import the worker

const PdfViewer = ({ file }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1.5);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  useEffect(() => {
    const loadPdfPage = async () => {
      try {
        const loadingTask = pdfjs.getDocument(file);
        const loadedPdf = await loadingTask.promise;

        setNumPages(pdf.numPages); // Set total number of pages

        const page = await pdf.getPage(currentPage);

        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext).promise;

        if (containerRef.current) {
          containerRef.current.innerHTML = ""; // Clear previous canvas
          containerRef.current.appendChild(canvas); // Append new canvas
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
        setError("Failed to load PDF. Please try again.");
      }
    };

    loadPdfPage();
  }, [file, scale, currentPage]); // Re-run when file, scale, or currentPage changes

  return (
    <div>
      {/* Page Navigation */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", marginTop: '300px' }}>
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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </div>
  );
};

export default PdfViewer;
