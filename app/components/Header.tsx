import {Navigation} from './Navigation';
import {Logo} from './Logo';

export function Header({loading}: {loading?: boolean}) {
  const content = loading ? (
    <>
      <Logo />
      <Navigation loading />
    </>
  ) : (
    <>
      <Logo />
      <Navigation />
    </>
  );
  return (
    <section className="Section--Header">
      <header className="Header">{content}</header>
    </section>
  );
}
