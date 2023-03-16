import {json, ActionArgs, LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {useCart} from '~/lib/cart/hooks';
import {Layout} from '~/components';
import {Cart as CartUi} from '~/components';

export async function action({request, context}: ActionArgs) {
  const {cart} = context;

  const [result, head] = await cart.perform(request);

  return json({cart: result}, {headers: head.headers, status: head.status});
}

export async function loader({context}: LoaderArgs) {
  const {cart} = context;

  const cartResponse = await cart.get();

  return json({cart: cartResponse});
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
