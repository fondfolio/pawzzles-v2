import {json, ActionArgs, LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useCart} from '~/lib/cart/hooks';
import {Layout} from '~/components';
import {Cart as CartUi} from '~/components';

export async function action({request, context}: ActionArgs) {
  const {cart} = context;

  const [result, headers, status] = await cart.perform(request);

  return json({cart: result}, {headers, status});
}

export async function loader({context}: LoaderArgs) {
  const cart = await context.cart.get();

  return json({cart});
}

export default function Cart() {
  return (
    <Layout>
      <section className="Cart Global__Section">
        <CartUi />
      </section>
    </Layout>
  );
}
