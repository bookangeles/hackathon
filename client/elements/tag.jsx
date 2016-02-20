require('./tag.styl');

const Tag = React.createClass({
  mixins: [Bem],
  getDefaultProps() {
    return {
      caption: '',
      modifier: '',
    };
  },

  render() {
    return (
      <div className={this.b_(`bookTag_${this.props.modifier || 'default'}`)}>
        {this.props.caption}
      </div>
    );
  },
});

export default Tag;
