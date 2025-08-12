import React from "react";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";

class Modal extends React.Component {
  state = {
    isFullLoaded: false,
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    const prevSrc =
      prevProps.node?.frontmatter?.image?.publicURL ||
      prevProps.node?.frontmatter?.image?.childImageSharp?.full;
    const nextSrc =
      this.props.node?.frontmatter?.image?.publicURL ||
      this.props.node?.frontmatter?.image?.childImageSharp?.full;
    if (prevSrc !== nextSrc) {
      // new image incoming → reset loaded state so we can fade correctly
      // using setState in componentDidUpdate is safe here because we gate on src change
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isFullLoaded: false });
    }
  }

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      this.props.handleClose();
    }
  };
  render() {
    const {
      node: { frontmatter },
    } = this.props;

    return (
      <div className="fixed z-[999] inset-0 bg-black/90 p-12 pb-0 md:p-5 md:pt-12">
        <div
          className="absolute top-4 right-5 w-6 h-6 cursor-pointer
                     before:content-[''] before:w-5 before:h-0.5 before:bg-white before:block before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-rotate-45
                     after:content-[''] after:w-5 after:h-0.5 after:bg-white after:block after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45"
          onClick={this.props.handleClose}
        />
        {this.props.hasNext && (
          <div
            className="absolute top-1/2 right-6 w-6 h-12 -translate-y-1/2 rotate-180 cursor-pointer md:top-[84%]
                       before:content-[''] before:w-5 before:h-0.5 before:bg-white before:block before:absolute before:top-1/2 before:left-0 before:-translate-y-[7px] before:-rotate-45
                       after:content-[''] after:w-5 after:h-0.5 after:bg-white after:block after:absolute after:top-1/2 after:left-0 after:translate-y-1.5 after:rotate-45"
            onClick={this.props.nextImage}
          />
        )}
        {this.props.hasPrev && (
          <div
            className="absolute top-1/2 left-6 w-6 h-12 -translate-y-1/2 cursor-pointer md:top-[84%]
                       before:content-[''] before:w-5 before:h-0.5 before:bg-white before:block before:absolute before:top-1/2 before:left-0 before:-translate-y-[7px] before:-rotate-45
                       after:content-[''] after:w-5 after:h-0.5 after:bg-white after:block after:absolute after:top-1/2 after:left-0 after:translate-y-1.5 after:rotate-45"
            onClick={this.props.prevImage}
          />
        )}
        <div className="h-full">
          <div className="max-w-full h-[calc(100%-160px)] md:h-[calc(100%-180px)] flex items-center justify-center">
            <a
              className="relative flex items-center justify-center max-w-full h-full w-full"
              href={getSrc(frontmatter.image.childImageSharp.full)}
              target="_blank"
              rel="noreferrer"
              key={frontmatter.image.publicURL}
            >
              {/* Placeholder thumb retains aspect ratio while original full image loads */}
              <GatsbyImage
                style={{ position: "absolute", inset: 0 }}
                alt={`${frontmatter.title} (placeholder)`}
                image={getImage(frontmatter.image.childImageSharp.thumb)}
                imgClassName="object-contain w-full h-full"
                objectFit="contain"
                imgStyle={{
                  opacity: this.state.isFullLoaded ? 0 : 1,
                  transition: "opacity 300ms ease",
                }}
              />
              {/* Full-quality original loads only in modal */}
              <img
                src={frontmatter.image.publicURL}
                alt={frontmatter.title}
                className="absolute inset-0 w-full h-full object-contain"
                loading="eager"
                style={{
                  opacity: this.state.isFullLoaded ? 1 : 0,
                  transition: "opacity 300ms ease",
                }}
                onLoad={() => this.setState({ isFullLoaded: true })}
              />
            </a>
          </div>
          <div className="h-40 md:h-45 py-5 flex items-center justify-center flex-col text-center text-white">
            <div className="mb-4">
              <h4 className="text-3xl font-normal mb-2.5 text-accent">
                {frontmatter.title}
                {frontmatter.copy && (
                  <h6 className="mt-2 uppercase text-[10px] text-accent">
                    Kopia
                  </h6>
                )}
              </h4>
              <div className="text-base font-normal mx-0.5 opacity-80 leading-relaxed tracking-wide">
                {frontmatter.description}
              </div>
            </div>

            <div className="text-base font-normal mx-0.5 opacity-80 leading-relaxed tracking-wide mb-2">
              {frontmatter.measures}
            </div>

            <div className="text-base font-normal mx-0.5 opacity-80 leading-relaxed tracking-wide">
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
                    <div className="mt-2 uppercase text-[10px] text-warning">
                      Obraz zarezerwowany
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
