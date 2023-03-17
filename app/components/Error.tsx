import {Link} from './Link';
import {Layout} from './Layout';

export function Error({error}: {error: Error}) {
  return (
    <Layout>
      <div className="Section--Page">
        <div className="Global__Section Page">
          <div className="Page__Title">
            <h1>Something went wrong</h1>
          </div>
          <div className="Page__Content">
            <div className="Format">
              <p>{error?.message}</p>
              <p>
                <Link to="/">Take me to the home page</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
