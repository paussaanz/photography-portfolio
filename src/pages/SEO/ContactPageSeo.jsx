import { Helmet } from "react-helmet";

const ContactPageSeo = () => {
  return (
    <Helmet>
      {/* Título de la página */}
      <title>Contact SYP - Photographer & Web Developer</title>

      {/* Meta Descripción */}
      <meta
        name="description"
        content="Get in touch with SYP, a passionate photographer and web developer. Whether you have a question, a project idea, or want to collaborate, feel free to reach out!"
      />

      {/* Palabras clave */}
      <meta
        name="keywords"
        content="contact, SYP, photography, web development, inquiries, collaboration"
      />

      {/* Canonical URL para SEO */}
      <link rel="canonical" href="https://www.sypcreative.com/contact" />

      {/* Open Graph para redes sociales */}
      <meta property="og:title" content="Contact SYP - Photographer & Web Developer" />
      <meta property="og:description" content="Reach out to SYP for inquiries or collaborations. Let's create something amazing together!" />
      <meta property="og:url" content="https://www.sypcreative.com/contact" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contact SYP - Photographer & Web Developer" />
      <meta name="twitter:description" content="Contact SYP for photography and web development projects. Let's collaborate!" />
      <meta name="twitter:image" content="https://www.sypcreative.com/logo-black.svg" />

      {/* Datos estructurados con JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "SYP",
          "url": "https://www.sypcreative.com",
          "image": "https://www.sypcreative.com/logo-black.svg",
          "jobTitle": "Photographer & Web Developer",
          "telephone": "+1-800-555-5555",
          "sameAs": [
            "https://www.instagram.com/syp",
            "https://www.linkedin.com/in/syp",
            "https://www.behance.net/syp"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default ContactPageSeo;
