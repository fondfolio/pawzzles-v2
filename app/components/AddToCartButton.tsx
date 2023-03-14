import {Button} from './Button';
import {useFetcher} from '@remix-run/react';
import {CartAction} from '../../cart/types';

interface Props {
  children: React.ReactNode;
  lines: LineItem[];
  productAnalytics?: unknown;
}

export function AddToCartButton({children, lines, productAnalytics}: Props) {
  const fetcher = useFetcher();
  const analytics = {
    event: 'addToCart',
    products: [productAnalytics],
  };

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
      <input type="hidden" name="cartAction" value="ADD_TO_CART" />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <Button>{children}</Button>
    </fetcher.Form>
  );
}
