import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";

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

export const Head = ({ data: { markdownRemark } }) => (
  <>
    <title>{markdownRemark.frontmatter.title} - Mateusz Wyczółkowski</title>
    <meta
      property="og:image"
      content="http://mateuszwyczolkowski.pl/fb_preview.jpg"
    />
    <meta
      name="description"
      content={`Obraz "${markdownRemark.frontmatter.title}" autorstwa Mateusza Wyczółkowskiego.`}
    />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
  </>
);

export default PaintingPost;
