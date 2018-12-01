import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import Masonry from "react-masonry-component";
import cn from "classnames";
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

  getPaintings() {
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
          {this.getPaintings().map((painting, id) => {
            const {
              node: { fields, frontmatter }
            } = painting;

            return (
              <Link
                to={fields.slug}
                key={id}
                className={cn(
                  "Gallery__item",
                  this.state.showPaintings && "Gallery__item--visible"
                )}
                style={{ transitionDelay: `${50 * id}ms` }}
              >
                <img
                  className={"Gallery__image"}
                  alt=""
                  src={frontmatter.image}
                />
                <div className="Gallery__description">
                  <h4 className="Gallery__description-title">
                    {frontmatter.title}
                  </h4>
                  <div className="Gallery__description-text">
                    {frontmatter.description}
                  </div>
                  <div className="Gallery__description-text">
                    {frontmatter.measures}
                  </div>
                  <div className="Gallery__description-text">
                    PLN {frontmatter.price_pln}.00
                  </div>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image
            description
            measures
            price_pln
            templateKey
          }
        }
      }
    }
  }
`;

export default IndexPage;
