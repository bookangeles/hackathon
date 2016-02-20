require('./cloud.styl');

import Tag from './tag.jsx';

const TagCloud = React.createClass({
  mixins: [Bem],
  getDefaultProps() {
    return {
      tags: [],
      modifier: '',
    };
  },

  render() {
    return (
      <div className={this.b_()}>
        {this.props.tags && _.map(this.props.tags, (tag, key) =>
          <Tag key={key} modifier={this.props.modifier} caption={tag.caption} />)}
      </div>
    );
  },
});

export default TagCloud;
