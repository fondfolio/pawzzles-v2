import {ShopifyServerProvider, DefaultRoutes} from '@shopify/hydrogen';
import {Switch} from 'react-router-dom';
import shopifyConfig from '../shopify.config';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import {AppProvider} from './components/AppProvider';
import * as icons from './svgs';

export default function App({manager, ...serverState}) {
  const pages = import.meta.globEager('./pages/**/*.server.(jsx|tsx)');

  return (
    <ShopifyServerProvider manager={manager} shopifyConfig={shopifyConfig}>
      <AppProvider icons={icons}>
        <DefaultSeo />
        <Switch>
          <DefaultRoutes
            pages={pages}
            serverState={serverState}
            fallback={<NotFound />}
          />
        </Switch>
      </AppProvider>
    </ShopifyServerProvider>
  );
}
