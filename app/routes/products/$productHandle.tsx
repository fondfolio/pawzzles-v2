import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData, useFetcher} from '@remix-run/react';
import type {
  ProductVariant,
  Product as ProductType,
} from '@shopify/hydrogen/storefront-api-types';
import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';
import {CartAction} from '~/lib/cart/types';

export async function loader({params, context}: LoaderArgs) {
  const {productHandle} = params;

  const {product} = await context.storefront.query<{
    product: ProductType & {selectedVariant?: ProductVariant};
  }>(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      country: context.storefront.i18n?.country,
      language: context.storefront.i18n?.language,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return defer({
    product,
    analytics: {
      pageType: 'product',
    },
  });
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();
  const {title, vendor, descriptionHtml} = product;
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  return (
    <>
      <h1>{title}</h1>
      <h2>{vendor}</h2>
      <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      <CartForm
        lines={[
          {
            merchandiseId: selectedVariant.id,
            quantity: 1,
          },
        ]}
        action="ADD_TO_CART"
      >
        <button>Add</button>
      </CartForm>
    </>
  );
}

const PRODUCT_QUERY = `#graphql

  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      vendor
      variants(first: 1) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
  }
`;

interface Props {
  children: React.ReactNode;
  lines: CartLineInput[];
  analytics?: unknown;
  action: CartAction;
}

export function CartForm({children, lines, analytics}: Props) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
      <input type="hidden" name="cartAction" value="ADD_TO_CART" />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {children}
    </fetcher.Form>
  );
}
