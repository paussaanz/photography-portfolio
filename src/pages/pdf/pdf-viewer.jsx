import React, { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry"; // Importa el worker necesario

const PdfViewer = ({ file }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjs.getDocument(file);
        const pdf = await loadingTask.promise;

        // Cargar la primera página del PDF
        const page = await pdf.getPage(1);

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        const viewport = page.getViewport({ scale: 1.5 }); // Ajusta el zoom
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Renderizar en el canvas
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (error) {
        console.error("Error cargando el PDF:", error);
      }
    };

    loadPdf();
  }, [file]);

  return <canvas ref={canvasRef} />;
};

export default PdfViewer;
