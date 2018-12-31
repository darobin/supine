
// import { Router } from 'preact-router';
import { h, render } from 'preact';
import { HorizontalContainer, Pane } from './components/containers';

window.onload = () => render(
  (
    <div>
      <header>
        <p>supine</p>
      </header>
      <main>
        <HorizontalContainer>
          <Pane width="350px" resizeHandle="right">
            <div style={{ background: '#ebebec', height: '100%' }}>ohai</div>
          </Pane>
          <Pane grow="1">
            <div style={{ height: '100%' }}>…</div>
          </Pane>
        </HorizontalContainer>
      </main>
    </div>
  ),
  document.body
);
