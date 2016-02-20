require('./cloud.styl');

import Tag from './tag.jsx';

export default React.createClass({
  getDefaultProps() {
    return {
      tags: [],
      modifier: '',
    };
  },

  render() {
    return (
      <div className="tagCloud">
        {this.props.tags && _.map(this.props.tags, (tag, key) =>
          <Tag key={key} modifier={this.props.modifier} caption={tag.caption} />)}
      </div>
    );
  },
});
