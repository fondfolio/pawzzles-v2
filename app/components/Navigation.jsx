import React, {useState} from 'react';

import CartToggle from './CartToggle';
import {Button} from './Button';
import {url} from '../lib/url';
import {translations} from '../lib/translation';

export function Navigation({loading}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const items = [
    {
      label: translations.layout.pages.about,
      url: url.page('about'),
    },
    {
      label: translations.layout.pages.faqs,
      url: url.page('faqs'),
    },
  ];

  const linksMarkup = items.map((link) => {
    return (
      <li key={link.label}>
        <Button primary url={link.url}>
          {link.label}
        </Button>
      </li>
    );
  });

  const cartMarkup = loading ? null : (
    <CartToggle
      handleClick={() => {
        if (isMobileNavOpen) {
          setIsMobileNavOpen(false);
        }
      }}
    />
  );

  return (
    <div className="Nav">
      <div className="Nav__Menu">
        <ul className="Menu">{linksMarkup}</ul>
      </div>
      {cartMarkup}
    </div>
  );
}
