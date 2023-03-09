import {Button} from './Button';

export function AddToCartButton({children, lines, productAnalytics}) {
  const fetcher = useFetcher();
  const analytics = {
    event: 'addToCart',
    products: [productAnalytics],
  };

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
      <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <Button as="button" type="submit">
        {children}
      </Button>
    </fetcher.Form>
  );
}
