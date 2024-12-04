// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Set up the worker from the correct path in pdfjs-dist
// pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.mjs';
 

const BookPathAnimation = () => {

  return (
    <div>
      HOLA
   </div>
    // <div style={{ textAlign: 'center', padding: '20px' }}>
    //   <Document
    //     file="/prueba.pdf" // Ensure the file is in the `public` directory
    //     onLoadSuccess={onDocumentLoadSuccess}
    //     loading={<div>Loading PDF...</div>} // Optional: Add a loading message
    //   >
    //     {numPages &&
    //       Array.from({ length: numPages }, (_, index) => (
    //         <Page
    //           key={`page_${index + 1}`}
    //           pageNumber={index + 1}
    //           renderAnnotationLayer={false} // Optional: Disable annotation layer for cleaner UI
    //           renderTextLayer={false} // Optional: Disable text layer for performance
    //         />
    //       ))}
    //   </Document>
 
  );
};

export default BookPathAnimation;
