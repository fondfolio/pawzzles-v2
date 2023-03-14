import React from 'react';
import {classNames} from '@shopify/css-utilities';
import * as icons from '../svgs';

interface IconProps {
  name: keyof typeof icons;
  inverted?: boolean;
}

export function Icon({name, inverted, ...rest}: IconProps) {
  const Svg = icons[name];

  const iconClassName = classNames('Icon', {
    // eslint-disable-next-line @typescript-eslint/naming-convention
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
