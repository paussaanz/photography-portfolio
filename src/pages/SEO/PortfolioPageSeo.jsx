import { Helmet } from 'react-helmet';

const PortfolioPageSeo = ({ portfolioParallaxHero }) => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>SYP Creative Portfolio - Capturing Moments</title>

      {/* Meta Descripción */}
      <meta
        name="description"
        content="Explore the creative portfolio of SYP, showcasing stunning photography that transforms ordinary moments into lasting memories."
      />

      {/* Palabras clave */}
      <meta
        name="keywords"
        content="SYP, portfolio, photography, creative work, visual storytelling"
      />

      {/* Canonical URL para SEO */}
      <link rel="canonical" href="https://www.sypcreative.com/portfolio" />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content="SYP Creative Portfolio - Capturing Moments" />
      <meta property="og:description" content="Explore stunning photography and visual storytelling through the lens of SYP Creative." />
      <meta property="og:url" content="https://www.sypcreative.com/portfolio" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={portfolioParallaxHero[0]} /> {/* Cambiar según la primera imagen de la serie */}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="SYP Creative Portfolio - Capturing Moments" />
      <meta name="twitter:description" content="Explore stunning photography and visual storytelling through the lens of SYP Creative." />
      <meta name="twitter:image" content={portfolioParallaxHero[0]} /> {/* Cambiar según la primera imagen de la serie */}

      {/* Datos estructurados con JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": "SYP Creative Portfolio",
          "url": "https://www.sypcreative.com/portfolio",
          "description": "Explore the creative portfolio of SYP, showcasing stunning photography that transforms ordinary moments into lasting memories.",
          "image": portfolioParallaxHero[0],
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

export default PortfolioPageSeo;
