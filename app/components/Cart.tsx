// import React from 'react';
import {Image, Money, flattenConnection} from '@shopify/hydrogen';
import {Form} from '@remix-run/react';
import {CartLine} from '@shopify/hydrogen/storefront-api-types';

import {useCart} from '~/lib/cart/hooks';
import {CartAction} from '~/lib/cart/components';
import {Link} from '~/components';
import {translations} from '../lib/translation';
// import {useCartUI} from './CartUIProvider';
import {Button} from './Button';
// import {Drawer} from './Drawer';
import {QuantityControls} from './QuantityControls';

// export function Cart() {
//   const {isCartOpen, closeCart} = useCartUI();
//   return (
//     <Drawer
//       title="title"
//       open={isCartOpen}
//       onClose={closeCart}
//       footer={<CartFooter />}
//     >
//       <CartContents />
//     </Drawer>
//   );
// }

// function CartFooter() {
//   const {checkoutUrl, estimatedCost, lines} = useCart();

//   if (lines.length === 0) {
//     return null;
//   }

//   const {totalAmount} = estimatedCost;

//   return (
//     <footer>
//       <Button url={checkoutUrl}>Checkout</Button>
//       <div className="Cart__Bottom">
//         <div className="Cart__Subtotal">
//           <span className="Cart__SubtotalLabel Heading--4">
//             {translations.cart.subtotal}
//           </span>
//           <Money
//             className="Cart__SubtotalValue Heading--2"
//             money={{
//               amount: totalAmount.amount,
//               currencyCode: totalAmount.currencyCode,
//             }}
//           />
//         </div>
//         <Button extrude circle primary url={checkoutUrl}>
//           <span className="Button__Target">
//             {translations.layout.cart.checkout}
//           </span>
//         </Button>
//       </div>
//     </footer>
//   );
// }

type Theme = 'light' | 'dark';

interface CartProps {
  theme?: Theme;
}

export function Cart({theme}: CartProps) {
  const {lines} = useCart() || {};

  const flattenedLines = flattenConnection(lines);

  if (flattenedLines.length === 0) {
    return (
      <div className="Cart">
        <div className="Cart__Empty">
          <h3>Your cart is empty.</h3>
          <p>
            <Link to="/products/pawzzle">Continue Shopping</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="Cart">
      {flattenedLines.map((line) => (
        <CartItem theme={theme || 'light'} key={line.id} item={line} />
      ))}
    </div>
  );
}

interface CartItemProps {
  theme: Theme;
  item: CartLine;
}

function CartItem({item, theme}: CartItemProps) {
  if (!item?.id) return null;

  const {id, quantity, merchandise} = item;
  const {product, price, image} = merchandise;

  if (typeof quantity === 'undefined' || !product) return null;

  const {handle, title} = product;

  const byLineMarkup = (
    <span className="Item__ByLine">
      {translations.layout.cart.no_variants_text}
    </span>
  );

  const imageMarkup = image ? (
    <Image width={200} height={200} data={image} alt={merchandise.title} />
  ) : null;

  return (
    <div className="Item" key={item.id}>
      <div className="Item__Image">{imageMarkup}</div>
      <div className="Item__Details">
        <div className="Item__Line">
          <div className="Item__Info">
            <Button primary inverted={theme === 'dark'} url={handle}>
              {title}
            </Button>
            <h4>{byLineMarkup}</h4>
            <CartAction
              inputs={{lineIds: [id]}}
              action="LINES_REMOVE"
              trigger={
                <Button
                  aria-label="Remove from cart"
                  inverted={theme === 'dark'}
                  small
                  primary
                >
                  {translations.layout.cart.remove}
                </Button>
              }
            />
          </div>
        </div>
        <div className="Item__Line">
          <QuantityControls
            outline
            inverted={theme === 'dark'}
            line={{merchandiseId: merchandise.id, id: item.id}}
            quantity={quantity}
          />
          <div className="Item__Price">
            <Money
              data={{
                amount: item.cost.totalAmount.amount,
                currencyCode: item.cost.totalAmount.currencyCode,
              }}
              className="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
