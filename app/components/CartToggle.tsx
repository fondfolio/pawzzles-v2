import {Icon} from './Icon';
import {classNames} from '@shopify/css-utilities';
import {Link} from '~/components/Link';
import {useCart} from '~/lib/cart/hooks';

interface Props {
  text: string;
}

export default function CartToggle({text}: Props) {
  const cart = useCart();
  const isCartOpen = false;
  const buttonClassName = classNames('Button', {
    CartToggle: true,
    'Button--primary': true,
    'Button--inverted': isCartOpen,
  });

  const countMarkup = isCartOpen ? (
    <Icon name="Close" />
  ) : (
    <span className="Count">
      <span className="Count__Text">{cart?.totalQuantity || 0}</span>
    </span>
  );

  return (
    <span
      className={buttonClassName}
      aria-expanded={isCartOpen}
      aria-controls="cart"
    >
      <Link to="/cart">{countMarkup}</Link>
      <span className="visually-hidden">{text}</span>
    </span>
  );
}
