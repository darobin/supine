
import { Router } from 'preact-router';
import { h, render } from 'preact';

window.onload = () => render(
  (
    <div>
      <header>
        <p>Supine</p>
      </header>
      <Router>
        {/* Just put the editor in the router, matching everything but with the needed info */}
      </Router>
    </div>
  ),
  document.body
);
