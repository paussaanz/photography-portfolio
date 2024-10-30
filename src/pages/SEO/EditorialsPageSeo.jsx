import { Helmet } from 'react-helmet';

const EditorialsPageSeo = ({ editorialsParallaxHero }) => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>SYP Creative Editorials - Capturing Stories</title>

      {/* Meta Descripción */}
      <meta
        name="description"
        content="Discover the latest editorial works from SYP Creative. Capturing stories and visual narratives through stunning imagery."
      />

      {/* Palabras clave */}
      <meta
        name="keywords"
        content="SYP, editorials, photography, visual storytelling, creative works"
      />

      {/* Canonical URL para SEO */}
      <link rel="canonical" href="https://www.sypcreative.com/editorials" />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content="SYP Creative Editorials - Capturing Stories" />
      <meta property="og:description" content="Explore captivating editorials showcasing the art of storytelling through photography." />
      <meta property="og:url" content="https://www.sypcreative.com/editorials" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={editorialsParallaxHero[0]} /> {/* Cambiar según la primera imagen de la serie */}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="SYP Creative Editorials - Capturing Stories" />
      <meta name="twitter:description" content="Explore captivating editorials showcasing the art of storytelling through photography." />
      <meta name="twitter:image" content={editorialsParallaxHero[0]} /> {/* Cambiar según la primera imagen de la serie */}

      {/* Datos estructurados con JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "SYP Creative Editorials",
          "url": "https://www.sypcreative.com/editorials",
          "description": "Discover the latest editorial works from SYP Creative, capturing stories through stunning imagery.",
          "image": editorialsParallaxHero[0],
          "author": {
            "@type": "Person",
            "name": "SYP",
            "url": "https://www.sypcreative.com"
          }
        })}
      </script>
    </Helmet>

  );
};

export default EditorialsPageSeo;
