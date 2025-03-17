import React from "react";
import "./style.scss";

class Picture extends React.Component {
  render() {
    const {
      node: { frontmatter }
    } = this.props;

    return (
      <div className="Picture">

        {this.props.hasNext && (
          <div
            className="Picture__arrow Picture__arrow--next"
            onClick={this.props.nextImage}
          />
        )}
        {this.props.hasPrev && (
          <div
            className="Picture__arrow Picture__arrow--prev"
            onClick={this.props.prevImage}
          />
        )}
        <div className="Picture__inner">
          <div className="Picture__image-container">
            <a
              className="Picture__image-link"
              href={frontmatter.image.childImageSharp.fluid.originalImg}
              target="_blank"
              rel="noopener"
            >
              <img
                className="Picture__image"
                src={frontmatter.image.childImageSharp.fluid.src}
              />
            </a>
          </div>
          <div className="Picture__description">
            <div className="Picture__text">
              <h4 className="Picture__text-title">
                {frontmatter.title}
                {frontmatter.copy && (
                  <h6 className="Picture__text-copy">Kopia</h6>
                )}
              </h4>
              <div className="Picture__text-content">
                {frontmatter.description}
              </div>
            </div>

            <div className="Picture__measures">{frontmatter.measures}</div>

            <div className="Picture__price">
              {frontmatter.sold ? (
                <span className="Picture__sold">Obraz sprzedany / sold</span>
              ) : (
                <React.Fragment>
                  {frontmatter.price_pln &&
                  !frontmatter.price_pln === "0" &&
                  `PLN ${frontmatter.price_pln}.00`}
                  {frontmatter.reserved && (
                    <div className="Picture__reserved">Obraz zarezerwowany</div>
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

export default Picture
