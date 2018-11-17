import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import "./style.scss";

function AboutPage({ data }) {
  return (
    <Page>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Page>
  );
}

export const query = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default AboutPage;
