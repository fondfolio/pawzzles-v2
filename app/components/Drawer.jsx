import React from 'react';
import {classNames} from '@shopify/css-utilities';
import {translations} from '../lib/translation';
import {Button} from './Button';

export function Drawer({open, children, footer, onClose}) {
  const drawerClassName = classNames('Drawer', {
    'Drawer--open': open,
  });

  return (
    <div className={drawerClassName}>
      <div className="Drawer__Header">
        <Button
          inverted
          icon={{
            name: 'ArrowLeft',
            fallbackText: translations.layout.cart.continue_browsing,
          }}
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        />
      </div>
      <div className="Drawer__Body">{children}</div>
      <div className="Drawer__Footer">{footer}</div>
    </div>
  );
}
