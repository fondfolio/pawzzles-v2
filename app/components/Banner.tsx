import {classNames} from '@shopify/css-utilities';

interface BannerProps {
  children?: React.ReactNode;
  heading?: string;
  media?: React.ReactNode;
  align?: 'left' | 'right';
  inverted?: boolean;
}

export function Banner({
  children,
  heading,
  media,
  align,
  inverted,
}: BannerProps) {
  const className = classNames(
    'Banner',
    'Global__Section',
    align === 'left' && 'Banner__left',
    inverted && 'Banner--inverted',
  );

  return (
    <section className="shopify-section Section--Banner">
      <section className={className}>
        <div className="Banner__Content ">
          <span className="Banner__Heading Heading--4">{heading}</span>
          <div className="Format">{children}</div>
        </div>
        <div className="Banner__Image">{media}</div>
      </section>
    </section>
  );
}
