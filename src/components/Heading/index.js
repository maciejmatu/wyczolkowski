import React from "react";
import { Link } from "gatsby";
import config from "../../config/main.json";
import "./style.scss";

function Heading({ title }) {
  return (
    <div className="Heading">
      <h1 className="Heading__title">{title}</h1>
      <div className="Heading__social">
        {config.fb_link && (
          <a href={config.fb_link} target="_blank" rel="noopener">
            facebook
          </a>
        )}
        {config.ig_link && (
          <a href={config.ig_link} target="_blank" rel="noopener">
            instagram
          </a>
        )}
      </div>
      <nav>
        <ul className="Heading__nav-list">
          <li className="Heading__nav-item">
            <Link
              className="Heading__nav-link"
              activeClassName="Heading__nav-link--active"
              to="/"
            >
              Galeria
            </Link>
          </li>
          <li className="Heading__nav-item">
            <Link
              className="Heading__nav-link"
              activeClassName="Heading__nav-link--active"
              to="/about"
            >
              O mnie
            </Link>
          </li>
          <li className="Heading__nav-item">
            <Link
              className="Heading__nav-link"
              activeClassName="Heading__nav-link--active"
              to="/contact"
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Heading;
