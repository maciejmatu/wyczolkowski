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
