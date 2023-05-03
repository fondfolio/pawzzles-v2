import {json, ActionArgs, LoaderArgs} from '@shopify/remix-oxygen';
import {Layout} from '~/components';
import {Cart as CartUi} from '~/components';

export async function action({request, context}: ActionArgs) {
  const {cart} = context;

  try {
    const {cart: result, errors, headers, status} = await cart.perform(request);

    if (errors && errors.length > 0) {
      const formData = await request.formData();

      throw new Error(
        `Could not update the cart. ${formData.get('action')} ${errors.join()}`,
      );
    }

    return json({cart: result}, {headers, status});
  } catch (error: unknown) {
    return json({error}, {status: 500});
  }
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

export function ErrorBoundary({error}: {error: Error}) {
  return (
    <Layout>
      <section className="Cart Global__Section">
        <pre>{error.message}</pre>
        <CartUi />
      </section>
    </Layout>
  );
}
