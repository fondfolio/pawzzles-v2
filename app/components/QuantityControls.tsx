import {useState} from 'react';
import {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {translations} from '../lib/translation';
import {CartAction} from '~/lib/cart/components';
import {Button} from './Button';

interface Props {
  line: CartLineUpdateInput;
  inverted?: boolean;
  outline?: boolean;
  quantity: number;
}

export function QuantityControls({outline, inverted, line, quantity}: Props) {
  return (
    <div className="QuantityControls">
      <CartAction
        inputs={[{...line, quantity: quantity - 1}]}
        action="LINES_UPDATE"
      >
        {({state}) => {
          return (
            <Button
              outline={outline}
              inverted={inverted}
              primary
              type="submit"
              loading={state === 'submitting'}
              icon={{
                name: 'Subtract',
                fallbackText: translations.layout.cart.subtract_item,
              }}
            />
          );
        }}
      </CartAction>
      <span className="strong Item__Quantity">{quantity}</span>
      <CartAction
        inputs={[{...line, quantity: quantity + 1}]}
        action="LINES_UPDATE"
      >
        {({state}) => (
          <Button
            outline={outline}
            inverted={inverted}
            primary
            type="submit"
            loading={state === 'submitting'}
            icon={{
              name: 'Add',
              fallbackText: translations.layout.cart.add_item,
            }}
          />
        )}
      </CartAction>
    </div>
  );
}
