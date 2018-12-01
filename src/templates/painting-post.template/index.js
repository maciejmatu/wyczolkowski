import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import "./style.scss";

function PaintingPost({ data: { markdownRemark } }) {
  return (
    <Page>
      <h1 className="Painting__title">{markdownRemark.frontmatter.title}</h1>
      <img
        className="Painting__image"
        alt=""
        src={markdownRemark.frontmatter.image}
      />
    </Page>
  );
}

export const pageQuery = graphql`
  query PaintingByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        image
      }
    }
  }
`;

export default PaintingPost;
