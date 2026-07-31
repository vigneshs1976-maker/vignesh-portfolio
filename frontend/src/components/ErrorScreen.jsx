import { IconAlert } from './icons';
import { api } from '../api/client';

export default function ErrorScreen({ onRetry }) {
  return (
    <div className="error-screen">
      <div className="error-card">
        <span className="error-icon"><IconAlert /></span>
        <h1>Can&rsquo;t reach the backend</h1>
        <p>
          The site couldn&rsquo;t load data from <code>{api.baseUrl}</code>. This usually means
          the Django API isn&rsquo;t running yet.
        </p>
        <ol>
          <li>Open a terminal in <code>backend/</code></li>
          <li>Run <code>python manage.py runserver</code></li>
          <li>Make sure MySQL is running and <code>.env</code> is configured</li>
        </ol>
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
}
