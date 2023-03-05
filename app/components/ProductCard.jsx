import {Image, Link} from '@shopify/hydrogen/client';

export default function ProductCard({product}) {
  const firstVariant = product?.variants?.edges[0]?.node;

  if (!product) {
    return null;
  }

  return (
    <div className="first:col-span-2 flex flex-col justify-center rounded-3xl overflow-hidden shadow-2xl">
      <Link to={`/products/${product.handle}`}>
        {firstVariant?.image && (
          <Image
            className="w-full h-100 object-cover"
            image={firstVariant?.image}
            style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
            options={{width: '1600', crop: 'center'}}
          />
        )}
      </Link>
      <div className="p-5">
        <h3 className="font-semibold text-black">
          <Link to={`/products/${product.handle}`}>{product.title}</Link>
        </h3>
      </div>
    </div>
  );
}
