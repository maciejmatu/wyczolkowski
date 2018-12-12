import React, { Component } from "react";
import { graphql } from "gatsby";
import Masonry from "react-masonry-component";
import cn from "classnames";
import Page from "../../components/Page";
import Modal from "../../components/Modal";
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

  gotoPrevLightboxImage = () => {
    this.setState(({ currentImage }) => ({ currentImage: currentImage - 1 }));
  };

  gotoNextLightboxImage = () => {
    this.setState(({ currentImage }) => ({ currentImage: currentImage + 1 }));
  };

  closeLightbox = () => {
    this.setState({ isOpen: false });
  };

  openImage = index => {
    this.setState({ isOpen: true, currentImage: index });
  };

  render() {
    return (
      <Page>
        {this.state.isOpen && (
          <Modal
            handleClose={this.closeLightbox}
            {...this.getPaintings()[this.state.currentImage]}
          />
        )}
        <Masonry
          className="Gallery"
          options={{ transitionDuration: 0 }}
          onLayoutComplete={this.showPaintings}
        >
          {this.getPaintings().map((painting, id) => {
            const {
              node: { frontmatter }
            } = painting;

            return (
              <div
                key={id}
                onClick={() => this.openImage(id)}
                className={cn(
                  "Gallery__item",
                  this.state.showPaintings && "Gallery__item--visible"
                )}
                style={{ transitionDelay: `${50 * id}ms` }}
              >
                <img
                  className={"Gallery__image"}
                  alt=""
                  src={frontmatter.image.childImageSharp.fluid.src}
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
                    {frontmatter.sold
                      ? "Obraz sprzedany"
                      : `PLN ${frontmatter.price_pln}.00`}
                  </div>
                </div>
              </div>
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
            image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                  originalImg
                }
              }
            }
            description
            measures
            sold
            price_pln
            templateKey
          }
        }
      }
    }
  }
`;

export default IndexPage;
