import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker.entry";

gsap.registerPlugin(ScrollTrigger);

const PdfViewer = ({ file }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null); // Contenedor para ScrollTrigger
  const renderTaskRef = useRef(null); // Referencia al render task actual
  const [pdf, setPdf] = useState(null);
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

  useEffect(() => {
    if (pdf && totalPages > 0) {
      setupScrollAnimation(pdf);
    }
  }, [pdf, totalPages]);

  const renderPage = async (pdfDoc, pageNumber) => {
    try {
      if (pageNumber < 1 || pageNumber > totalPages) {
        console.error(`Página inválida solicitada: ${pageNumber}`);
        return; // Evitar renderizaciones fuera de rango
      }

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdfDoc.getPage(pageNumber);

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const rotation = (page.rotate || 0) % 360;
      const viewport = page.getViewport({ scale: 1, rotation });
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;

      const scale = Math.min(
        containerWidth / viewport.width,
        containerHeight / viewport.height
      );

      const scaledViewport = page.getViewport({ scale, rotation });
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      renderTaskRef.current = page.render(renderContext);
      await renderTaskRef.current.promise;
    } catch (error) {
      if (error.name === "RenderingCancelledException") {
        console.log(`Renderización cancelada para la página ${pageNumber}.`);
      } else {
        console.error("Error al renderizar la página:", error);
      }
    }
  };

  const setupScrollAnimation = (pdfDoc) => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const scrollHeight = totalPages * window.innerHeight;

    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollHeight}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const newPage = Math.ceil(self.progress * totalPages);

          if (newPage >= 1 && newPage <= totalPages) {
            renderPage(pdfDoc, newPage);
          }
        },
      },
    });
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
      <div style={styles.spacer}>
        <p>Has llegado al final del PDF. Sigue explorando.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  spacer: {
    position: "relative",
    marginTop: "100vh",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e0",
  },
};

export default PdfViewer;
