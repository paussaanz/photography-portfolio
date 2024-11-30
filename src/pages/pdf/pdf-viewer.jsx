import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core';

const PdfViewer = () => {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          height: '750px',
        }}
      >
        <Viewer fileUrl="./test.pdf" />
      </div>
    </Worker>
  );
};

export default PdfViewer;
