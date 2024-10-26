import { Helmet } from 'react-helmet';

const EditorialsDetailPageSeo = () => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>Editorials - SYP Creative Portfolio</title>

      {/* Meta Descripción */}
      <meta
        name="description"
        content="Explore the editorial works of SYP, featuring stunning photography and creative design. Discover the artistry behind each project."
      />

      {/* Palabras clave */}
      <meta
        name="keywords"
        content="editorials, photography, creative design, SYP, portfolio"
      />

      {/* Canonical URL para SEO */}
      <link rel="canonical" href="https://www.sypcreative.com/editorials" />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content="Editorials - SYP Creative Portfolio" />
      <meta property="og:description" content="Discover the editorial projects of SYP, showcasing exceptional photography and design." />
      <meta property="og:url" content="https://www.sypcreative.com/editorials" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Editorials - SYP Creative Portfolio" />
      <meta name="twitter:description" content="Dive into SYP's editorial works, featuring captivating photography and design." />
      <meta name="twitter:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Datos estructurados con JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "Editorials by SYP",
          "url": "https://www.sypcreative.com/editorials",
          "image": "https://www.sypcreative.com/logo-black.svg",
          "description": "A collection of editorial works showcasing photography and design by SYP.",
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

export default EditorialsDetailPageSeo;
