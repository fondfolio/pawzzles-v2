import {url} from '~/lib/url';
import {translations} from '~/lib/translation';

import {Icon} from './Icon';

const INSTAGRAM_HANDLE = 'catpawzzles';

export function Footer() {
  const linksMarkup = [
    {
      href: url.product('pawzzle'),
      content: 'Shop',
    },
    {
      href: url.page('faqs'),
      content: 'FAQs',
    },

    {
      href: url.page('about'),
      content: 'About',
    },
    {
      href: url.page('giving'),
      content: 'Giving',
    },
    {
      href: url.page('instructions'),
      content: 'Instructions',
    },
    {
      href: url.page('shipping-returns'),
      content: 'Shipping & Returns',
    },
  ].map(({href, content}) => (
    <li key={href}>
      <a href={href}>{content}</a>
    </li>
  ));

  const instagrams = [
    '//cdn.shopify.com/s/files/1/0457/6857/2950/files/IMG_5205-crop_400x400_crop_center.jpg',
    '//cdn.shopify.com/s/files/1/0457/6857/2950/files/IMG_4632-crop_400x400_crop_center.jpg',
    '//cdn.shopify.com/s/files/1/0457/6857/2950/files/IMG_2958_400x400_crop_center.jpg',
    '//cdn.shopify.com/s/files/1/0457/6857/2950/files/IMG_4561_400x400_crop_center.jpg',
    '//cdn.shopify.com/s/files/1/0457/6857/2950/files/IMG_5210-crop_400x400_crop_center.jpg',
  ].map((src) => {
    return (
      <a
        key={src}
        target="_blank"
        rel="noreferrer"
        className="Media Instagram__Image"
        href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
      >
        <img alt="" className="Image" src={src} />
      </a>
    );
  });

  return (
    <div className="Section--Footer">
      <div className="Instagram">
        <div className="Instagram__Heading">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            className="Heading--3 Link Link--Reset"
          >
            {translations.footer.instagram_heading}
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            className="Heading--4"
          >
            {INSTAGRAM_HANDLE}
          </a>
        </div>
        <div className="Instagram__Feed">{instagrams}</div>
      </div>
      <div className="Global__Section Footer">
        <div className="Footer__Secondary">
          <div className="Newsletter">
            <div className="Newsletter__Header">
              <span className="Heading--4">Subscribe Miaow!</span>
              <span className="Heading--3">
                10% off your first order, promos and more
              </span>
            </div>
            <form
              action="{{section.settings.newsletter_action}}"
              method="post"
              target="_blank"
              className="Form"
            >
              <div className="Form__Legend ">
                <span className="small">Email</span>
              </div>
              <div className="Form__Group">
                <label htmlFor="EMAIL" className="Label">
                  <input
                    id="EMAIL"
                    required
                    placeholder="minou@pawzzles.cat"
                    className="Input"
                    type="email"
                    name="EMAIL"
                    autoComplete="email"
                  />
                  <span className="visually-hidden">Email address</span>
                </label>
                <div className="visually-hidden">
                  <input
                    type="text"
                    name="b_15455134a504bb165af60d27b_769d566233"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <button
                  className="Button Button--inverted Button--primary Button--padded"
                  type="submit"
                >
                  <span>Join</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="Footer__Tertiary">
          <div className="Footer__Nav">
            <ul className="Menu small">{linksMarkup}</ul>
          </div>
          <div className="Footer__Credit">
            <span className="small ">
              &copy; <a href="https://fondfolio.com">Fondfolio</a>
            </span>
            <span className="Dash" />
            <span className="Heading--4">Puzzles for cats</span>
          </div>
          <div className="Logo Footer__Logo">
            <Icon name="Logo" inverted />
          </div>
        </div>
      </div>
    </div>
  );
}
