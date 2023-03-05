import Header from './Header.client.jsx';

/**
 * A shared component and Suspense call that's used in `App.server.jsx` to let your app wait for code to load while declaring a loading state
 */
export default function LoadingFallback() {
  return (
    <div className="LoadingFallback">
      <Header loading />
    </div>
  );
}
