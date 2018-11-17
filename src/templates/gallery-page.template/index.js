import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import Masonry from "react-masonry-component";
import Page from "../../components/Page";
import "./style.scss";

class IndexPage extends Component {
  state = {
    showPaintings: false
  };

  showPaintings = () => {
    if (!this.state.showPaintings) {
      this.setState({ showPaintings: true });
    }
  };

  get paintings() {
    return this.props.data.allMarkdownRemark.edges.filter(
      post => post.node.frontmatter.templateKey === "painting-post.template"
    );
  }

  render() {
    return (
      <Page>
        <Masonry
          className="Gallery"
          options={{ transitionDuration: 0 }}
          onLayoutComplete={this.showPaintings}
        >
          {this.paintings.map((painting, id) => {
            const {
              node: { fields, frontmatter }
            } = painting;

            return (
              <Link to={fields.slug} key={id} className="Gallery__item">
                <img
                  className={`Gallery__image ${this.state.showPaintings &&
                    "Gallery__image--visible"}`}
                  style={{ transitionDelay: `${50 * id}ms` }}
                  alt=""
                  src={frontmatter.image}
                />
                <div className="Gallery__description">
                  <h4 className="Gallery__description-title">
                    {frontmatter.title}
                  </h4>
                </div>
              </Link>
            );
          })}
        </Masonry>
      </Page>
    );
  }
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image
            templateKey
          }
        }
      }
    }
  }
`;

export default IndexPage;
