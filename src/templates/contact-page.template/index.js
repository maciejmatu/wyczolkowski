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
      <div className="mt-16 flex justify-center">
        <div className="w-2/3 md:w-11/12">
          <GatsbyImage
            image={getImage(image.childImageSharp.gatsbyImageData)}
            alt="Contact"
            className="w-full"
            imgClassName="object-center"
          />
        </div>
      </div>
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
