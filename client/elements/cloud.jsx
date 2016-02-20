require('./cloud.styl');

import Tag from './tag.jsx'

export default React.createClass({
  getDefaultProps() {
    return {
      tags: []
    }
  },

  render() {
    return (
      <div className="tagCloud">
        {this.props.tags.map(tag => <Tag key={tag.id} caption={tag.caption} />)}
      </div>
    );
  }
});
