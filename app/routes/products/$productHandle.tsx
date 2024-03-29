import {useState} from 'react';
import {defer, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import type {
  ProductVariant,
  Product as ProductType,
  CartLineInput,
} from '@shopify/hydrogen/storefront-api-types';
import {Money, Image} from '@shopify/hydrogen';
import {CartAction} from '~/lib/cart/components';
import {
  Button,
  Layout,
  Banner,
  Illustration,
  Testimonial,
  DonationText,
} from '~/components';
import {translations} from '~/lib/translation';

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
  const [quantity, setQuantity] = useState(1);
  const {title, descriptionHtml} = product;
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const lines = [
    {
      merchandiseId: selectedVariant.id,
      quantity,
    },
  ];

  return (
    <Layout>
      <section className="Product Global__Section">
        <div className="Product__Mast">
          <div className="Product__Info" aria-label="Product details">
            <h1 className="Product__Title">{title}</h1>

            <div className="Product__Description">
              <div className="p medium">
                <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
              </div>
            </div>

            <div className="Product__Cart">
              <div className="Price Heading--2">
                <Money
                  data={{
                    amount: selectedVariant.price.amount,
                    currencyCode: selectedVariant.price.currencyCode,
                  }}
                />
              </div>
              <CartAction action="LINES_ADD" inputs={lines}>
                {({submission}) => (
                  <div className="AddToCartControls ">
                    <div className="QuantityControls">
                      <Button
                        primary
                        icon={{
                          name: 'Subtract',
                          fallbackText: translations.layout.cart.subtract_item,
                        }}
                        onClick={() => setQuantity(quantity - 1)}
                      />
                      <span className="strong Item__Quantity">{quantity}</span>
                      <Button
                        primary
                        icon={{
                          name: 'Add',
                          fallbackText: translations.layout.cart.add_item,
                        }}
                        onClick={() => setQuantity(quantity + 1)}
                      />
                    </div>

                    <Button
                      type="submit"
                      loading={Boolean(submission)}
                      primary
                      padded
                    >
                      Add to cart
                    </Button>
                  </div>
                )}
              </CartAction>
            </div>
            <DonationText />
          </div>
          <div className="Product__FeaturedImage">
            <div
              className="Media Image Image--floating"
              style={{paddingTop: '82%'}}
            >
              {selectedVariant.image && (
                <Image className="Media__Item" data={selectedVariant.image} />
              )}
            </div>
          </div>
        </div>
        <div className="Product__Dimensions">
          <div className="Dimensions__Image">
            <img
              src={
                '//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/pawzzle-diagram-static.svg'
              }
            />
          </div>
          <div className="Dimensions__Content small">
            <span className="Dash" />
            <p>
              The Pawzzle is 7.75” (20 cm) square (a) and 2.5” (6.4 cm) in
              height (b). The holes are 1.75” (4.5 cm) in diameter (c). Plenty
              of space for paws of all sizes.
            </p>
          </div>
        </div>
      </section>
      <Banner
        align="left"
        inverted
        heading="How it’s made"
        media={
          <video className="Video" loop="" muted="" autoPlay="">
            <source
              src="https://cdn.shopify.com/s/files/1/0457/6857/2950/files/pawzzle-how-its-made-rough-4-960_-_Large_540p_-_Large_540p.mp4?v=1618599906"
              type="video/mp4"
            />
          </video>
        }
      >
        <p>
          Each Pawzzle takes about an hour to produce. First, we cut all the
          pieces using a laser cutter. We use offcuts generated by{' '}
          <a href="https://fondfolio.com">Fondfolio</a> where we create
          one-of-a-kind memory books. This material has a formaldehyde-free
          fiber board core and real wood laminate on either side. Each Pawzzle
          will have a random mix of Maple, Cherry, Walnut and Oak pieces.
        </p>
        <p>
          The rest of the production process involves preparation of the pieces
          — removing the protective mask, wiping down the sooty edges,
          assembling the feet and cutting and attaching the 100% wool foot pads.
        </p>

        <p>
          We also test the pieces to ensure a good friction-fit and pack each
          completed Pawzzle for shipping.
        </p>
      </Banner>
      <Testimonial
        author="Minou, Berlin"
        picture="//cdn.shopify.com/s/files/1/0457/6857/2950/files/Screen_Shot_2021-04-18_at_8.54.11_PM_700x700.png?v=1618772090"
        content="  The number and distribution of treats or toys means that no Pawzzle
            sesh is the same. This means I’m less likely to get bored and lose
            interest — purrrfect!"
      />
      <Illustration
        width={250}
        src="//cdn.shopify.com/s/files/1/0457/6857/2950/files/cat-top-pink-static_2x_c5bfad07-1763-42b5-b0ed-94c19e005d31_750x.png"
      />
    </Layout>
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
          image {
            url
          }
        }
      }
    }
  }
`;
