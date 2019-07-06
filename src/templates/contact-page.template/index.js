import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import "./style.scss";

function ContactPage({ data }) {
  const { email, phone, image, store_link } = data.markdownRemark.frontmatter;
  return (
    <Page>
      <div className="Contact__content">
        {store_link && (
          <a href={store_link}>{store_link.replace(/http.*www./g, "")}</a>
        )}

        <a href={`mailto:${email}`}>{email}</a>
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
      <img src={image.childImageSharp.fluid.src} className="Contact__image" />
      {/* <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} /> */}
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
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default ContactPage;
