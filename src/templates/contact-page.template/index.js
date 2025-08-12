import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Page from "../../components/Page";

function ContactPage({ data }) {
  const { email, phone, image, store_link } = data.markdownRemark.frontmatter;
  return (
    <Page>
      <div className="text-center max-w-5xl mx-auto px-6">
        <a
          href={`mailto:${email}`}
          className="block no-underline text-2xl md:text-xl text-dark tracking-wide"
        >
          {email}
        </a>
        <a
          href={`tel:${phone}`}
          className="block mt-4 no-underline text-2xl md:text-xl text-dark tracking-wide"
        >
          {phone}
        </a>
      </div>
      <GatsbyImage
        image={getImage(image.childImageSharp.gatsbyImageData)}
        alt="Contact"
        className="w-2/3 md:w-11/12 mt-16 block mx-auto"
      />
    </Page>
  );
}

export const query = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        phone
        email
        store_link
        image {
          childImageSharp {
            gatsbyImageData(
              width: 1000
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
    <title>Kontakt - Mateusz Wyczółkowski</title>
    <meta
      property="og:image"
      content="http://mateuszwyczolkowski.pl/fb_preview.jpg"
    />
    <meta
      name="description"
      content="Skontaktuj się z Mateuszem Wyczółkowskim - artystą malarzem. Znajdź informacje kontaktowe i link do sklepu online."
    />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
  </>
);

export default ContactPage;
