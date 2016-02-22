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
        {this.props.tags &&
          _(this.props.tags)
            .filter(tag => !!tag.caption)
            .map((tag, key) =>
              <Tag key={key} modifier={this.props.modifier} caption={tag.caption} />
            ).value()
        }
      </div>
    );
  },
});

export default TagCloud;
