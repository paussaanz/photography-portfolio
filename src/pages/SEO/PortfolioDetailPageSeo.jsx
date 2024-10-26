import React from 'react';
import { Helmet } from 'react-helmet';

const PortfolioDetailPageSeo = ({ title, heroImage }) => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>{`${title} - SYP Creative Portfolio`}</title>

      {/* Meta Descripción */}
      <meta
        name="description"
        content={`Explore the ${title} project, showcasing the artistry and craftsmanship of SYP Creative. Discover stunning visuals and innovative designs.`}
      />

      {/* Palabras clave */}
      <meta
        name="keywords"
        content={`SYP, portfolio, photography, ${title}, creative, design, project details`}
      />

      {/* Canonical URL para SEO */}
      <link rel="canonical" href={`https://www.sypcreative.com/portfolio/${title}`} />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content={`${title} - SYP Creative Portfolio`} />
      <meta property="og:description" content={`Discover the ${title} project, a showcase of exceptional photography and creative design by SYP.`} />
      <meta property="og:url" content={`https://www.sypcreative.com/portfolio/${title}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={heroImage.src} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} - SYP Creative Portfolio`} />
      <meta name="twitter:description" content={`Explore the ${title} project, highlighting SYP's creative photography and design skills.`} />
      <meta name="twitter:image" content={heroImage.src} />

      {/* Datos estructurados con JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": title,
          "url": `https://www.sypcreative.com/portfolio/${title}`,
          "description": `Explore the ${title} project, showcasing the artistry and craftsmanship of SYP Creative.`,
          "image": heroImage.src,
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

export default PortfolioDetailPageSeo;
