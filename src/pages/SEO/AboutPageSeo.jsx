import { Helmet } from 'react-helmet';

const AboutPageSeo = () => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>About SYP - Photographer & Web Developer</title>

      {/* Meta Descripción */}
      <meta
        name="description"
        content="Discover the creative journey of SYP, a passionate photographer and web developer. Explore her portfolio and learn about her mission to capture moments and create stunning digital experiences."
      />

      {/* Palabras clave */}
      <meta
        name="keywords"
        content="SYP, photography, web development, portfolio, graphic design, creative work"
      />

      {/* Canonical URL para SEO */}
      <link rel="canonical" href="https://www.sypcreative.com/aboutsyp!" />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content="About SYP - Photographer & Web Developer" />
      <meta property="og:description" content="Explore SYP's journey as a photographer and web developer. Check out her portfolio to see her work." />
      <meta property="og:url" content="https://www.sypcreative.com/aboutsyp!" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About SYP - Photographer & Web Developer" />
      <meta name="twitter:description" content="Join SYP on her creative journey as a photographer and web developer. Discover her portfolio and projects." />
      <meta name="twitter:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Datos estructurados con JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "url": "https://www.sypcreative.com",
          "image": "https://www.sypcreative.com/logo-black.svg",
          "name": "SYP",
          "description": "SYP is a passionate photographer and web developer specializing in capturing moments and creating digital experiences.",
          "sameAs": [
            "https://www.instagram.com/syp",
            "https://www.linkedin.com/in/syp",
            "https://www.behance.net/syp"
          ],
          "jobTitle": "Photographer & Web Developer",
          "telephone": "+1-800-555-5555",
        })}
      </script>
    </Helmet>
  );
};

export default AboutPageSeo;
