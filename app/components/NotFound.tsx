import {Link} from './Link';
import {Layout} from './Layout';

export function NotFound() {
  return (
    <Layout>
      <div className="Section--Page">
        <div className="Global__Section Page">
          <div className="Page__Title">
            <h1> We’ve lost this page</h1>
          </div>
          <div className="Page__Content">
            <div className="Format">
              <p>
                We couldn’t find the page you’re looking for. Try checking the
                URL or heading back to the home page.
              </p>
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
