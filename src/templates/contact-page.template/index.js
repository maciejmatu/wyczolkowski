import React from "react";
import { graphql } from "gatsby";
import Page from "../../components/Page";
import "./style.scss";

function ContactPage({ data }) {
  const { email, phone, image } = data.markdownRemark.frontmatter;
  return (
    <Page>
      <div className="Contact__content">
        <a href={`mailto:${email}`}>{email}</a>
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
      <img src={image} className="Contact__image" />
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
        image
      }
    }
  }
`;

export default ContactPage;
