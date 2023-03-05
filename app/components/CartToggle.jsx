import {Icon} from './Icon';
import {classNames} from '@shopify/css-utilities';

export default function CartToggle({handleClick, text}) {
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
      <span className="Count__Text">0</span>
    </span>
  );

  return (
    <button
      className={buttonClassName}
      type="button"
      aria-expanded={isCartOpen}
      aria-controls="cart"
      onClick={() => {
        handleClick();
      }}
    >
      {countMarkup}
      <span className="visually-hidden">{text}</span>
    </button>
  );
}
