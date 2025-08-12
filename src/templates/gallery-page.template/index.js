import React, { Component } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Masonry from "react-masonry-component";
import cn from "classnames";
import Page from "../../components/Page";
import Modal from "../../components/Modal";

class IndexPage extends Component {
  state = {
    showPaintings: false,
    animateGrid: false,
  };

  showPaintings = () => {
    if (!this.state.showPaintings) {
      this.setState({ showPaintings: true });
    }
  };

  startSequentialFade = () => {
    if (!this.state.animateGrid) {
      this.setState({ animateGrid: true });
    }
  };

  getPaintings() {
    return this.props.data.allMarkdownRemark.edges.filter(
      (post) => post.node.frontmatter.templateKey === "painting-post.template"
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

  openImage = (index) => {
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
          className="w-full"
          options={{ transitionDuration: 0 }}
          updateOnEachImageLoad
          disableImagesLoaded={false}
          onImagesLoaded={this.startSequentialFade}
        >
          {this.getPaintings().map((painting, id) => {
            const {
              node: { frontmatter },
            } = painting;

            return (
              <div
                key={id}
                onClick={() => this.openImage(id)}
                className={cn(
                  "relative w-[calc(100%-24px)] md:w-[calc(50%-24px)] lg:w-[calc(33.33%-24px)] block my-0 mx-3 mb-6 cursor-pointer select-none group hover:[&_.gallery-overlay]:opacity-100 md:[&_.gallery-overlay]:opacity-0 overflow-hidden transition-opacity duration-500",
                  this.state.animateGrid
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                )}
                style={{
                  transitionDelay: this.state.animateGrid
                    ? `${100 * id}ms`
                    : "0ms",
                }}
                itemScope
                itemType="http://schema.org/Painting"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    this.openImage(id);
                  }
                }}
              >
                <GatsbyImage
                  className="w-full block transition-transform duration-300"
                  alt={frontmatter.title}
                  image={getImage(frontmatter.image.childImageSharp.thumb)}
                  imgClassName="w-full"
                />
                <div className="gallery-overlay absolute bottom-0 left-0 w-full h-full bg-black/80 text-white transition-opacity duration-300 opacity-0 p-4 md:p-6 flex flex-col justify-center">
                  <span hidden itemProp="author">
                    Mateusz Wyczolkowski
                  </span>
                  <h4
                    className="text-xl md:text-lg font-normal mb-3 text-accent"
                    itemProp="name"
                  >
                    <span>{frontmatter.title}</span>
                    {frontmatter.copy && (
                      <h6 className="mt-2 uppercase text-[10px] font-bold text-accent">
                        Kopia
                      </h6>
                    )}
                  </h4>
                  <div
                    className="text-sm font-normal my-0.5 opacity-80 leading-relaxed tracking-wide"
                    itemProp="material"
                  >
                    {frontmatter.description}
                  </div>
                  <div className="text-sm font-normal my-0.5 opacity-80 leading-relaxed tracking-wide">
                    {frontmatter.measures}
                  </div>
                  <div className="text-sm font-normal my-0.5 opacity-80 leading-relaxed tracking-wide">
                    {frontmatter.sold ? (
                      <span className="text-error text-[10px] uppercase font-semibold">
                        Obraz sprzedany / sold
                      </span>
                    ) : (
                      <React.Fragment>
                        {frontmatter.price_pln &&
                          !frontmatter.price_pln === "0" &&
                          `PLN ${frontmatter.price_pln}.00`}
                        {frontmatter.reserved && (
                          <div className="mt-2 uppercase text-[10px] font-bold text-warning">
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            image {
              publicURL
              childImageSharp {
                thumb: gatsbyImageData(
                  width: 700
                  placeholder: NONE
                  formats: [AUTO, WEBP]
                )
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

export const Head = ({ data }) => (
  <>
    <title>Mateusz Wyczółkowski</title>
    <meta
      property="og:image"
      content="http://mateuszwyczolkowski.pl/fb_preview.jpg"
    />
    <meta
      name="description"
      content="Moja przygoda z malarstwem miała swój początek już we wczesnym dzieciństwie. Od najmłodszych lat obserwowałem mojego dziadka Witolda przy pracy twórczej. Dziadek malował pejzaże, kwiaty oraz portrety. Wtedy już podejmowałem pierwsze próby przenoszenia emocji na papier przy użyciu pastel i tuszu."
    />
    <link rel="shortcut icon" type="image/png" href="/favicon.png" />
  </>
);

export default IndexPage;
