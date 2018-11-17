import React from "react";
import { Link } from "gatsby";
import "./style.scss";

function Heading({ title }) {
  return (
    <div className="Heading">
      <h1 className="Heading__title">{title}</h1>
      <nav>
        <ul className="Heading__nav-list">
          <li className="Heading__nav-item">
            <Link
              className="Heading__nav-link"
              activeClassName="Heading__nav-link--active"
              to="/"
            >
              Gallery
            </Link>
          </li>
          <li className="Heading__nav-item">
            <Link
              className="Heading__nav-link"
              activeClassName="Heading__nav-link--active"
              to="/contact"
            >
              Contact
            </Link>
          </li>
          <li className="Heading__nav-item">
            <Link
              className="Heading__nav-link"
              activeClassName="Heading__nav-link--active"
              to="/about"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Heading;
