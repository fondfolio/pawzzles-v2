// import React from 'react';
// import {
//   Image,
//   useCart,
//   useCartLinesUpdateCallback,
//   Money,
// } from '@shopify/hydrogen/client';

// import {translations} from '../lib/translation';
// import {useCartUI} from './CartUIProvider';
// import {Button} from './Button';
// import {Drawer} from './Drawer';
// import {QuantityControls} from './QuantityControls';

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

// function CartContents() {
//   const {lines} = useCart();

//   if (lines.length === 0) {
//     return (
//       <div className="Cart">
//         <div className="Cart__Empty">Empty</div>
//       </div>
//     );
//   }
//   return (
//     <div className="Cart">
//       {lines.map((line) => (
//         <CartItem key={line.id} item={line} />
//       ))}
//     </div>
//   );
// }

// function CartItem({item}) {
//   const updateLines = useCartLinesUpdateCallback();
//   const {id, quantity, merchandise} = item;
//   const {product, priceV2, image} = merchandise;
//   const {handle, title} = product;

//   const byLineMarkup = (
//     <span className="Item__ByLine">
//       {translations.layout.cart.no_variants_text}
//     </span>
//   );

//   return (
//     <div className="Item" key={item.id}>
//       <div className="Item__Image">
//         <Image image={image} height={100} width={120} />
//       </div>
//       <div className="Item__Details">
//         <div className="Item__Line">
//           <div className="Item__Info">
//             <Button inverted url={handle}>
//               {title}
//             </Button>
//             {byLineMarkup}
//           </div>
//           <Button
//             aria-label="Remove from cart"
//             onClick={() => {
//               updateLines([{id, quantity: 0}]);
//             }}
//             inverted
//             small
//             primary
//           >
//             {translations.layout.cart.remove}
//           </Button>
//         </div>
//         <div className="Item__Line">
//           <QuantityControls
//             outline
//             inverted
//             quantity={quantity}
//             onAdd={() => {
//               updateLines([{id, quantity: quantity + 1}]);
//             }}
//             onSubtract={() => {
//               updateLines([{id, quantity: quantity - 1}]);
//             }}
//           />
//           <div className="Item__Price medium">
//             <Money
//               money={{
//                 amount: priceV2.amount,
//                 currencyCode: priceV2.currencyCode,
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export function Cart() {
  return null;
}
