import { Helmet } from "react-helmet";

const HomeSeo = () => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>Home - SYP Creative Portfolio</title>

      {/* Meta Descripción */}
      <meta
        name="description"
        content="Welcome to SYP Creative Portfolio. Explore captivating photography and innovative web design that captures the essence of creativity."
      />

      {/* Palabras clave */}
      <meta
        name="keywords"
        content="SYP, portfolio, photography, web design, creative, art, professional photography"
      />

      {/* Canonical URL para SEO */}
      <link rel="canonical" href="https://www.sypcreative.com" />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content="Home - SYP Creative Portfolio" />
      <meta property="og:description" content="Discover the world of SYP, a creative portfolio showcasing stunning photography and exceptional web design." />
      <meta property="og:url" content="https://www.sypcreative.com" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Home - SYP Creative Portfolio" />
      <meta name="twitter:description" content="Explore SYP's creative works in photography and web design. Join me in capturing brilliance." />
      <meta name="twitter:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Datos estructurados con JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SYP Creative Portfolio",
          "url": "https://www.sypcreative.com",
          "description": "A creative portfolio featuring stunning photography and innovative web design by SYP.",
          "author": {
            "@type": "Person",
            "name": "SYP",
            "url": "https://www.sypcreative.com"
          },
          "image": "https://www.sypcreative.com/logo-black.svg"
        })}
      </script>
    </Helmet>
  );
};

export default HomeSeo;
