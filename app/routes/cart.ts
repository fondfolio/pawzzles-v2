import {json, ActionArgs} from '@shopify/remix-oxygen';

export async function action({context}: ActionArgs) {
  const {session} = context;
  const cartId = await session.get('cartId');
  return json({
    analytics: {
      cartId,
    },
  });
}
