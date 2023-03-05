import {Navigation} from './Navigation';
import {Logo} from './Logo';
// import {Cart} from './Cart';

export function Header({loading}) {
  const content = loading ? (
    <>
      <Logo />
      <Navigation loading />
    </>
  ) : (
    <>
      <Logo />
      <Navigation />
      {/* <Cart /> */}
    </>
  );
  return (
    <section className="Section--Header">
      <header className="Header">{content}</header>
    </section>
  );
}
