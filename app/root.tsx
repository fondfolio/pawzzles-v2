import {
  json,
  type LinksFunction,
  type MetaFunction,
  type LoaderArgs,
} from '@shopify/remix-oxygen';
import {useEffect} from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react';
import {
  AnalyticsEventName,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  ShopifySalesChannel,
  useShopifyCookies,
} from '@shopify/hydrogen';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';
import styles from './styles/app.css';
import {useAnalyticsFromLoaders} from './lib/analytics';
import favicon from '../public/favicon.svg';
import {Error} from '~/components';

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&family=Roboto:wght@400;500;900&display=swap',
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({context}: LoaderArgs) {
  const [layout] = await Promise.all([
    context.storefront.query<{shop: Shop}>(LAYOUT_QUERY),
    // context.cart.get(),
  ]);

  return json({layout});
}

export default function App() {
  // const hasUserConsent = true;
  // useShopifyCookies({hasUserConsent});
  // const data = useLoaderData<typeof loader>();
  // const location = useLocation();
  // const pageAnalytics = useAnalyticsFromLoaders();

  // const {moneyFormat, id: shopId} = data.layout.shop ||

  // const currency = 'USD' as const;
  // useEffect(() => {
  //   const payload = {
  //     ...getClientBrowserParameters(),
  //     ...pageAnalytics,
  //     cartId: data.cartId,
  //     shopId,
  //     hasUserConsent,
  //     shopifySalesChannel: ShopifySalesChannel.hydrogen,
  //     currency,
  //   };

  //   // console.log('payload', payload);

  //   sendShopifyAnalytics({
  //     eventName: AnalyticsEventName.PAGE_VIEW,
  //     payload,
  //   });
  // }, [location]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}: {error: Error}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Error error={error} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
      id
      moneyFormat
    }
  }
`;
