import {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import {translations} from '../lib/translation';
import {CartAction} from '~/lib/cart/components';
import {Button} from './Button';

interface Props {
  line: CartLineUpdateInput;
  inverted: boolean;
  outline: boolean;
  quantity: number;
}

export function QuantityControls({outline, quantity, inverted, line}: Props) {
  return (
    <div className="QuantityControls">
      <CartAction
        inputs={[{...line, quantity: quantity - 1}]}
        action="LINES_UPDATE"
        trigger={
          <Button
            outline={outline}
            inverted={inverted}
            primary
            icon={{
              name: 'Subtract',
              fallbackText: translations.layout.cart.subtract_item,
            }}
          />
        }
      />
      <span className="strong Item__Quantity">{quantity}</span>
      <CartAction
        inputs={[{...line, quantity: quantity + 1}]}
        action="LINES_UPDATE"
        trigger={
          <Button
            outline={outline}
            inverted={inverted}
            primary
            icon={{
              name: 'Add',
              fallbackText: translations.layout.cart.add_item,
            }}
          />
        }
      />
    </div>
  );
}
