import React, {useContext} from 'react';

export const UrlContext = React.createContext({});

export const useUrl = () => useContext(UrlContext);

class Url {
  home() {
    return '/';
  }

  product(slug) {
    return `/products/${slug}`;
  }

  page(slug) {
    return `/pages/${slug}`;
  }
}

export const url = new Url();
