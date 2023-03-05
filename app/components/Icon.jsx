import React from 'react';
import {classNames} from '@shopify/css-utilities';
import * as icons from '../svgs';

export function Icon({name, inverted, ...rest}) {
  const Svg = icons[name];

  const iconClassName = classNames('Icon', {
    'Icon--inverted': inverted,
  });

  if (!Svg) {
    throw Error(`Icon ${name} not found.`);
  }

  if (typeof Svg === 'string') {
    return null;
  }

  return (
    <div className={iconClassName}>
      <Svg {...rest} />
    </div>
  );
}
