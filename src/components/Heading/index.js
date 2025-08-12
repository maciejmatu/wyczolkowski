import React from "react";
import { Link } from "gatsby";
import config from "../../config/main.json";

function Heading({ title }) {
  return (
    <header className="pb-15 md:pb-10 relative overflow-hidden pt-8">
      <h1 className="my-[70px] md:my-10 mb-4 font-normal font-secondary text-5xl md:text-3xl leading-tight md:leading-relaxed tracking-wider text-center text-dark drop-shadow-sm">
        {title}
      </h1>
      <div className="pb-5 flex justify-center">
        {config.fb_link && (
          <a 
            href={config.fb_link} 
            target="_blank" 
            rel="noreferrer"
            className="no-underline opacity-40 text-sm text-black p-0 mx-2.5 transition-opacity duration-300 hover:opacity-100"
          >
            facebook
          </a>
        )}
        {config.ig_link && (
          <a 
            href={config.ig_link} 
            target="_blank" 
            rel="noreferrer"
            className="no-underline opacity-40 text-sm text-black p-0 mx-2.5 transition-opacity duration-300 hover:opacity-100"
          >
            instagram
          </a>
        )}
      </div>
      <nav>
        <ul className="mx-auto p-0 list-none flex justify-center md:mx-[-12px]">
          <li className="relative after:content-[''] after:w-[3px] after:h-[3px] md:after:w-[2px] md:after:h-[2px] after:bg-black after:opacity-50 after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:rounded-full last:after:content-none">
            <Link
              className="relative font-primary uppercase tracking-wide text-sm md:text-xs opacity-40 no-underline text-dark transition-opacity duration-300 p-3 md:p-1.5 block my-0 mx-6 md:mx-1.5 hover:opacity-100 [&.active]:opacity-100"
              activeClassName="active"
              to="/"
            >
              Galeria
            </Link>
          </li>
          <li className="relative after:content-[''] after:w-[3px] after:h-[3px] md:after:w-[2px] md:after:h-[2px] after:bg-black after:opacity-50 after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:rounded-full last:after:content-none">
            <Link
              className="relative font-primary uppercase tracking-wide text-sm md:text-xs opacity-40 no-underline text-dark transition-opacity duration-300 p-3 md:p-1.5 block my-0 mx-6 md:mx-1.5 hover:opacity-100 [&.active]:opacity-100"
              activeClassName="active"
              to="/about"
            >
              O mnie
            </Link>
          </li>
          <li className="relative after:content-[''] after:w-[3px] after:h-[3px] md:after:w-[2px] md:after:h-[2px] after:bg-black after:opacity-50 after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:rounded-full last:after:content-none">
            <Link
              className="relative font-primary uppercase tracking-wide text-sm md:text-xs opacity-40 no-underline text-dark transition-opacity duration-300 p-3 md:p-1.5 block my-0 mx-6 md:mx-1.5 hover:opacity-100 [&.active]:opacity-100"
              activeClassName="active"
              to="/contact"
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Heading;