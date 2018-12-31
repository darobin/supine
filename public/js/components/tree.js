
import { h } from 'preact';
// import { Link } from 'preact-router/match';
import { Provider, connect } from 'unistore/preact';

import { store, actions } from '../store';

const BookTreeComponent = connect(['tree'], actions)(class {
  componentDidMount () {
    this.props.loadTree();
  }
  render ({ tree }) {
    return (
      <Node {...tree} root/>
    );
  }
});

function Node ({ root, title, children }) {
  if (!title && !children) return null;
  let hasChildren = children && !!children.length
    , icon = ''
  ;
  if (root) icon = '◫';
  else if (hasChildren) icon = '§';
  return (
    <div class="booktree-node">
      <div class="booktree-node-chevron">
        {hasChildren && <span>⌄</span>}
      </div>
      <div class="booktree-node-content">
        <div class="booktree-node-title">
          <span class="booktree-node-icon">{icon}</span>
          {title || ''}
        </div>
        {
          hasChildren &&
          <div class="booktree-node-children">
            {children.map(c => <Node key={c.id} {...c}/>)}
          </div>
        }
      </div>
    </div>
  );
}

export default function BookTree () {
  return (
    <Provider store={store}>
      <BookTreeComponent/>
    </Provider>
  );
}
