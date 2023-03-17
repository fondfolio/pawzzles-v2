import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import invariant from 'tiny-invariant';
import {Await, useLoaderData} from '@remix-run/react';
import {Hero, Testimonial, Banner, Illustration, Layout} from '~/components';
// import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
// import {getHeroPlaceholder} from '~/lib/placeholders';
import type {
  Product,
  Metafield,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';
// import {AnalyticsPageType} from '@shopify/hydrogen';
// import {routeHeaders, CACHE_SHORT} from '~/data/cache';

export async function loader({params, context}: LoaderArgs) {
  const handle = 'pawzzle';

  const {product} = await context.storefront.query<{product: Product}>(QUERY, {
    variables: {handle},
  });

  invariant(product, 'No data returned from Shopify API');

  return defer({product});
}

export default function Index({country = {isoCode: 'US'}}) {
  const {product} = useLoaderData<typeof loader>();

  return (
    <Layout>
      <Hero product={product} />
      <Illustration
        width={225}
        src="https://cdn.shopify.com/s/files/1/0457/6857/2950/files/cat-bottom-blue-static_2x_ba2995f0-27e3-4cd5-93d2-e95d9a651100_750x.png"
      />
      <Testimonial
        author="Dr. Sarah Ellis, The Trainable Cat"
        content="Obtaining food rewards through puzzle feeders involves considerable effort on the cat’s part, but evolution has designed cats for this—even greater effort is needed when hunting in the wild—so the process of working for food is intrinsically rewarding."
      />
      <Illustration
        width={175}
        src="//cdn.shopify.com/s/files/1/0457/6857/2950/files/cat-top-blue-static_2x_a74ea06d-edc8-4039-9c43-865ff34df537_750x.png"
      />
      <Banner
        heading="Pawrigin story"
        media={
          <video className="Video" loop="" muted="" autoPlay="">
            <source
              src="https://cdn.shopify.com/s/files/1/0457/6857/2950/files/Pawzzles-FlatPack-Stopmotion-3-loop-2.mp4"
              type="video/mp4"
            />
          </video>
        }
      >
        <h2>From scraps to head scratchers</h2>
        <p>
          Years ago, we made a pawzzle for our cat, Minou, but it wasn’t until
          we had a growing pile of wood offcuts from our other business,{' '}
          <a href="https://fondfolio.com/">Fondfolio</a>, that we considered
          making these for other felines.
        </p>
        <p>
          A Pawzzle shouldn’t replace regular interactive playtime, but it can
          help focus some of your cat’s energy when you can’t give them
          attention, like during a meeting. It’s a frustration-reduction box!
        </p>
      </Banner>
      <Banner
        align="left"
        title="How it works"
        media={
          <img
            className="Image"
            src="//cdn.shopify.com/s/files/1/0457/6857/2950/files/IMG_4561-crop_700x700.jpg?v=1616333208"
            alt="Our cat minou hunting for treats in his wooden Pawzzle"
          />
        }
      >
        <h2>Learning to Pawzzle happens in three stages:</h2>
        <ol>
          <li>
            Identifying that there is food in the box, usually by smell or by
            seeing you add it.
          </li>
          <li>Having the desire to get the food.</li>
          <li>Trying different ways to get it.</li>
        </ol>
        <p>
          As your cat successfully acquires the treats, they will learn to
          repeat their actions in order to get more. For this reason, Pawzzles
          are also a great introduction to reward-based training!
        </p>
        <p>
          For less food-motivated cats, try introducing the Pawzzle right before
          meal time.
        </p>

        <p>
          <a className="" href="https://pawzzles.cat/pages/faqs">
            More tips for successful Pawzzling
          </a>
        </p>
      </Banner>
      <Banner
        title="Giving back"
        media={
          <img
            className="Image"
            src="//cdn.shopify.com/s/files/1/0457/6857/2950/files/IMG_4632-crop_700x700.jpg?v=1616333100"
            alt=""
          />
        }
      >
        <h2>Paws for a purrrpose</h2>
        <p>
          10% of each Pawzzle sale is donated to animal welfare initiatives. Our
          plan is to give to a combination of local cat-based charities, such as
          the <a href="https://www.torontocatrescue.ca/">Toronto Cat Rescue</a>{' '}
          (where we adopted Minou), and the{' '}
          <a href="https://funds.effectivealtruism.org/funds/animal-welfare">
            Effective Altruism Animal Welfare Fund
          </a>{' '}
          which supports emerging animal welfare groups and advocacy research in
          a range of countries.
        </p>
        <p>
          <a href="https://pawzzles.cat/pages/giving">More about our giving</a>
        </p>
      </Banner>
    </Layout>
  );
}

const QUERY = `#graphql

  query product(
    $country: CountryCode
    $handle: String!
  ) @inContext(country: $country) {
    product: product(handle: $handle) {
      id
      vendor
      title
      handle
      variants(first: 1) {
        edges {
          node {
            id
            price {
              amount
              currencyCode
            }
            image {
              url
            }
          }
        }
      }
      seo {
        title
        description
      }
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
    }
  }
`;
