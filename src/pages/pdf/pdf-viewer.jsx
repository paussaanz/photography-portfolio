import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";

const PdfViewer = ({ file }) => {
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(file);
        const loadedPdf = await loadingTask.promise;

        setPdf(loadedPdf);
        setTotalPages(loadedPdf.numPages);
        renderPage(loadedPdf, 1); // Renderiza la primera página inicialmente
      } catch (error) {
        console.error("Error cargando el PDF:", error);
      }
    };

    loadPdf();
  }, [file]);

  const renderPage = async (pdfDoc, pageNumber) => {
    try {
      const page = await pdfDoc.getPage(pageNumber);

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const viewport = page.getViewport({ scale: 1.5 }); // Ajusta el zoom
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (error) {
      console.error("Error al renderizar la página:", error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      renderPage(pdf, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      renderPage(pdf, currentPage + 1);
    }
  };

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.controls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  canvas: {
    width: "750px",
    height: "500px",
    border: "1px solid #ddd",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

export default PdfViewer;
