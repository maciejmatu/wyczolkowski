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
        <div className="Modal__inner">
          <a
            className="Modal__image-container"
            href={frontmatter.image.childImageSharp.fluid.originalImg}
            target="_blank"
            rel="noopener"
          >
            <img
              className="Modal__image"
              src={frontmatter.image.childImageSharp.fluid.src}
            />
          </a>
          <div className="Modal__description">
            <div className="Modal__measures">{frontmatter.measures}</div>

            <div className="Modal__text">
              <h4 className="Modal__text-title">{frontmatter.title}</h4>
              <div className="Modal__text-content">
                {frontmatter.description}
              </div>
            </div>

            <div className="Modal__price">
              {frontmatter.sold
                ? "Obraz sprzedany"
                : `PLN ${frontmatter.price_pln}.00`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
