import {Header} from './Header';
import {Footer} from './Footer';
import {SkipToContent} from './SkipToContent';

export function Layout({children}) {
  const contentId = 'mainContent';

  return (
    <main className="Main">
      <SkipToContent href={`#${contentId}`} />
      <Header />

      <div id={contentId} className="Content">
        {children}
      </div>

      <Footer />
    </main>
  );
}
