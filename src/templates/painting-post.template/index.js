import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import "./style.scss";

function PaintingPost({ data: { markdownRemark } }) {
  return <Page />;
}

export const pageQuery = graphql`
  query PaintingByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
    }
  }
`;

export default PaintingPost;
