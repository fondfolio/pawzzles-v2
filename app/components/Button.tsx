/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import {classNames} from '@shopify/css-utilities';

import {Icon} from './Icon';

interface ButtonProps {
  onClick?(): void;
  primary?: boolean;
  inverted?: boolean;
  outline?: boolean;
  small?: boolean;
  stretch?: boolean;
  icon?: {
    name: keyof typeof import('../svgs');
    fallbackText: string;
  };
  url?: string;
  children?: React.ReactNode;
  loading?: boolean;
  padded?: boolean;
  extrude?: boolean;
  circle?: boolean;
}

export function Button({
  onClick,
  primary,
  inverted,
  outline,
  small,
  stretch,
  icon,
  url,
  children,
  loading,
  padded,
  extrude,
  circle,
}: ButtonProps) {
  const buttonClassName = classNames('Button', {
    'Button--icon': icon,
    'Button--square': icon && icon.fallbackText,
    'Button--padded': padded,
    'Button--outline': outline,
    'Button--primary': primary,
    'Button--small': small,
    'Button--inverted': inverted,
    'Button--stretch': stretch,
    'Button--loading': loading,
    'Button--extrude': extrude,
    'Button--circle': circle,
  });

  const content = icon ? (
    <>
      <span className="Button__Icon">
        <Icon inverted={inverted} name={icon.name} />
      </span>
      <span className="visually-hidden">{icon.fallbackText}</span>
      {children}
    </>
  ) : (
    children
  );

  const props = {
    className: buttonClassName,
  };

  const loadingMarkup = loading ? (
    <span className="Button__Spinner">
      <Icon name="Spinner" />
    </span>
  ) : null;

  const element = url ? (
    <a {...props} href={url}>
      {content} {loadingMarkup}
    </a>
  ) : (
    <button {...props} onClick={onClick}>
      {content} {loadingMarkup}
    </button>
  );

  return element;
}
/* eslint-enable @typescript-eslint/naming-convention */
