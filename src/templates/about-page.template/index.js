import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Page from "../../components/Page";

function AboutPage({ data }) {
  return (
    <Page>
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h1 className="text-center font-secondary tracking-wide font-normal mb-12 text-4xl md:text-3xl text-dark">
          {data.markdownRemark.frontmatter.title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <GatsbyImage
              className="w-full"
              alt={data.markdownRemark.frontmatter.title}
              image={getImage(
                data.markdownRemark.frontmatter.left_image.childImageSharp
                  .gatsbyImageData
              )}
            />
          </div>
          <div
            className="leading-relaxed font-light text-justify md:text-left [&_p]:mt-0 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 text-gray-800 text-lg md:text-base"
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />
        </div>
      </div>
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
            gatsbyImageData(
              width: 700
              placeholder: NONE
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => (
  <>
    <title>O mnie - Mateusz Wyczółkowski</title>
    <meta
      property="og:image"
      content="http://mateuszwyczolkowski.pl/fb_preview.jpg"
    />
    <meta
      name="description"
      content="Poznaj Mateusza Wyczółkowskiego - artystę malarza, który swoją przygodę z malarstwem rozpoczął już we wczesnym dzieciństwie."
    />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
  </>
);

export default AboutPage;
