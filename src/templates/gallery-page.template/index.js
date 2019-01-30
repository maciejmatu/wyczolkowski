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
            hasNext={!!this.getPaintings()[this.state.currentImage + 1]}
            hasPrev={!!this.getPaintings()[this.state.currentImage - 1]}
            nextImage={this.gotoNextLightboxImage}
            prevImage={this.gotoPrevLightboxImage}
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
                itemScope
                itemType="http://schema.org/Painting"
              >
                <img
                  className="Gallery__image"
                  alt=""
                  itemProp="image"
                  src={frontmatter.image.childImageSharp.fluid.src}
                />
                <div className="Gallery__description">
                  <span hidden itemProp="author">
                    Mateusz Wyczolkowski
                  </span>
                  <h4 className="Gallery__description-title" itemProp="name">
                    <span>{frontmatter.title}</span>
                    {frontmatter.copy && (
                      <h6 className="Gallery__description-copy">Kopia</h6>
                    )}
                  </h4>
                  <div
                    className="Gallery__description-text"
                    itemProp="material"
                  >
                    {frontmatter.description}
                  </div>
                  <div className="Gallery__description-text">
                    {frontmatter.measures}
                  </div>
                  <div className="Gallery__description-text">
                    {frontmatter.sold ? (
                      <span className="Gallery__sold">Obraz sprzedany</span>
                    ) : (
                      <React.Fragment>
                        PLN {frontmatter.price_pln}.00
                        {frontmatter.reserved && (
                          <div className="Gallery__description-reserved">
                            Obraz zarezerwowany
                          </div>
                        )}
                      </React.Fragment>
                    )}
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
            copy
            description
            reserved
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
