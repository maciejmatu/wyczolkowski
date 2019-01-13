import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import Heading from "../Heading";
import "./style.scss";

function Page({ children }) {
  return (
    <StaticQuery
      query={query}
      render={({ site }) => (
        <div className="Page">
          <Helmet>
            <title>{site.siteMetadata.title}</title>
            <meta
              property="og:image"
              content="http://mateuszwyczolkowski.pl/fb_preview.jpg"
            />
            <meta
              name="description"
              content="Moja przygoda z malarstwem miała swój początek już we wczesnym dzieciństwie. Od najmłodszych lat obserwowałem mojego dziadka Witolda przy pracy twórczej. Dziadek malował pejzaże, kwiaty oraz portrety. Wtedy już podejmowałem pierwsze próby przenoszenia emocji na papier przy użyciu pastel i tuszu. "
            />
            <link rel="shortcut icon" type="image/png" href="/favicon.png" />
          </Helmet>
          <Heading title={site.siteMetadata.title} />
          {children}
        </div>
      )}
    />
  );
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Page;
