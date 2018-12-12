import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import "./style.scss";

function AboutPage({ data }) {
  return (
    <Page>
      <h1 className="About__title">{data.markdownRemark.frontmatter.title}</h1>
      <img
        className="About__image"
        src={
          data.markdownRemark.frontmatter.left_image.childImageSharp.fluid.src
        }
      />
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
        left_image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default AboutPage;
