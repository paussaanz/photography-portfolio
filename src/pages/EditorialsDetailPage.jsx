import { useState } from "react";
import EditorialsDetailPageSeo from "./SEO/EditorialsDetailPageSeo";
import BookPathAnimation from "../components/EditorialsDetailPage/BookPathAnimation";

const EditorialsPage = () => {
  const slides = [
    { src: "/editorials/slide-1.webp", alt: "Slide 1", type: "image" },
    { src: "/editorials/slide-2.webp", alt: "Slide 2", type: "text" },
    { src: "/editorials/slide-3.webp", alt: "Slide 3", type: "custom" },
    { src: "/editorials/slide-4.webp", alt: "Slide 4", type: "custom" },
  ];

  return (
    <div data-barba="container">
      <EditorialsDetailPageSeo />

      <BookPathAnimation slides={slides} />
    </div>
  );
};

export default EditorialsPage;
