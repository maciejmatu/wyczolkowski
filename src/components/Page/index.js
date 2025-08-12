import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Heading from "../Heading";

function Page({ children }) {
  return (
    <StaticQuery
      query={query}
      render={({ site }) => (
        <div className="mx-auto max-w-[90%] w-full max-w-site pb-16 min-h-screen bg-gradient-to-b from-white to-gray-50">
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