import React, {useState} from 'react';
import {useCart} from '@shopify/hydrogen/client';
import {
  useCartLinesAddCallback,
  useCartCreateCallback,
  useProduct,
} from '@shopify/hydrogen/client';
import {translations} from '../lib/translation';
import {useCartUI} from './CartUIProvider';

import {Button} from './Button';
import {QuantityControls} from './QuantityControls';

export function AddToCartControls() {
  const {id} = useCart();
  const {selectedVariant} = useProduct();
  const linesAdd = useCartLinesAddCallback();
  const createCart = useCartCreateCallback();

  const {toggleCart} = useCartUI();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="AddToCartControls ">
      <QuantityControls
        quantity={quantity}
        onAdd={() => {
          setQuantity(quantity + 1);
        }}
        onSubtract={() => {
          if (quantity <= 1) {
            return;
          }
          setQuantity(quantity - 1);
        }}
      />
      <Button
        primary
        padded
        onClick={() => {
          toggleCart();

          if (id) {
            linesAdd([{merchandiseId: selectedVariant.id, quantity}]);
          } else {
            createCart({
              lines: [{merchandiseId: selectedVariant.id, quantity}],
            });
          }
        }}
      >
        <span className="Button__target">
          {translations.layout.cart.add_to_cart}
        </span>
      </Button>
    </div>
  );
}
