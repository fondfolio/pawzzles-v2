import {Image, Money} from '@shopify/hydrogen';
import {Link} from './Link';

export function Hero({product}) {
  if (!product) {
    return null;
  }

  const firstVariant = product?.variants?.edges[0]?.node;

  if (!firstVariant) {
    return null;
  }

  return (
    <div className="shopify-section Section--Hero">
      <section className="Hero">
        <div className="Hero__Left Pawzzle">
          <div className="Piece__Group">
            <div className="Piece">
              <div
                className="Piece__Top"
                style={{
                  backgroundImage:
                    'url(//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/pawzzle-piece-single-top-static.svg)',
                }}
              />
              <div className="Snack Snack--1" />
              <div
                className="Piece__Bottom"
                style={{
                  backgroundImage:
                    'url(//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/pawzzle-piece-single-bottom-static.svg)',
                }}
              />
            </div>
            <div className="Piece Piece--fill" />
            <div className="Piece Piece--extend">
              <div
                className="Piece__Top"
                style={{
                  backgroundImage:
                    'url(//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/pawzzle-piece-single-top-static.svg)',
                }}
              />
              <div className="Snack Snack--2" />
              <div
                className="Piece__Bottom"
                style={{
                  backgroundImage:
                    'url(//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/pawzzle-piece-single-bottom-static.svg)',
                }}
              />
            </div>
          </div>
          <div className="Piece__Group">
            <div className="Piece Piece--fill order-3 Piece--extend" />
            <div className="Piece">
              <div
                className="Piece__Bottom order-1"
                style={{
                  backgroundImage:
                    'url(//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/pawzzle-piece-single-bottom-static.svg)',
                }}
              />
              <div className="Snack Snack--3" />
              <div
                className="Piece__Top"
                style={{
                  backgroundImage:
                    'url(//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/pawzzle-piece-single-top-static.svg)',
                }}
              />
            </div>
            <div className="Piece Piece--fill order-1" />
          </div>
        </div>

        <div className="Hero__Right Hero__Content">
          <div className="Hero__Text ">
            <h1 className="Heading--1">Puzzles for cats</h1>
            <p className="Heading--3">
              Get their paws off your laptop, away from your plants, out of your
              face and into an activity that rewards their natural hunting
              instincts.
            </p>
            <div className="Hero__ProductImage Image--floating">
              <Link to={`/products/${product.handle}`}>
                {firstVariant?.image && (
                  <Image
                    height={2000}
                    width={1647}
                    className="Image"
                    image={firstVariant?.image}
                  />
                )}
              </Link>
            </div>
            <div className="Hero__PriceGroup">
              <div className="Hero__Price">
                <div className="Price Heading--2">
                  <dl>
                    <Money
                      data={{
                        amount: firstVariant.price.amount,
                        currencyCode: firstVariant.price.currencyCode,
                      }}
                    />
                  </dl>
                </div>
                <p className="small">
                  We donate 10% of each sale to animal welfare causes.
                  <br />
                  <a href="/pages/giving">Lean more about our donations</a>
                </p>
              </div>
              <div className="Hero__Button">
                <Link
                  className="Button Button--circle Button--primary Button--extrude"
                  to={`/products/${product.handle}`}
                >
                  <span className="Button__Target">Buy</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="Media Media--shadowed Hero__Media">
            <video loop="" muted="" autoPlay="">
              <source
                src="https://cdn.shopify.com/s/files/1/0457/6857/2950/files/Pawzzles_Cut_Short_-_other_angles_-_SD_480p_-_SD_480p.mp4"
                type="video/mp4"
              />
              <img
                className="Image"
                src="//cdn.shopify.com/s/files/1/0457/6857/2950/files/social-1_45ee254b-0b03-49b8-a0f6-5240f4187268_700x700.jpg"
                alt=""
              />
            </video>
          </div>
        </div>
      </section>

      <a
        className="Hero__Credit"
        href="https://fondfolio.com"
        style={{
          backgroundImage:
            'url(//cdn.shopify.com/s/files/1/0457/6857/2950/t/3/assets/credit-static.svg?v=18250149605501557923);',
        }}
      >
        <span className="Heading--4 strong visually-hidden">
          A Fondfolio Project
        </span>
      </a>
    </div>
  );
}
