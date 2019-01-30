import React from "react";
import "./style.scss";

class Modal extends React.Component {
  render() {
    const {
      node: { frontmatter }
    } = this.props;

    return (
      <div className="Modal">
        <div className="Modal__close" onClick={this.props.handleClose} />
        {this.props.hasNext && (
          <div
            className="Modal__arrow Modal__arrow--next"
            onClick={this.props.nextImage}
          />
        )}
        {this.props.hasPrev && (
          <div
            className="Modal__arrow Modal__arrow--prev"
            onClick={this.props.prevImage}
          />
        )}
        <div className="Modal__inner">
          <div className="Modal__image-container">
            <a
              className="Modal__image-link"
              href={frontmatter.image.childImageSharp.fluid.originalImg}
              target="_blank"
              rel="noopener"
            >
              <img
                className="Modal__image"
                src={frontmatter.image.childImageSharp.fluid.src}
              />
            </a>
          </div>
          <div className="Modal__description">
            <div className="Modal__text">
              <h4 className="Modal__text-title">
                {frontmatter.title}
                {frontmatter.copy && (
                  <h6 className="Modal__text-copy">Kopia</h6>
                )}
              </h4>
              <div className="Modal__text-content">
                {frontmatter.description}
              </div>
            </div>

            <div className="Modal__measures">{frontmatter.measures}</div>

            <div className="Modal__price">
              {frontmatter.sold ? (
                <span className="Modal__sold">Obraz sprzedany</span>
              ) : (
                <React.Fragment>
                  PLN {frontmatter.price_pln}.00
                  {frontmatter.reserved && (
                    <div className="Modal__reserved">Obraz zarezerwowany</div>
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
