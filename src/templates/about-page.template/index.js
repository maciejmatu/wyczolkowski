import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import "./style.scss";

function AboutPage({ data }) {
  return (
    <Page>
      <h1 className="About__title">{data.markdownRemark.frontmatter.title}</h1>
      <div
        className="About__content"
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
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
