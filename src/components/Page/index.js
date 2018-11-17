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
          <Helmet title={site.siteMetadata.title} />
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
