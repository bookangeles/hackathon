require('./tag.styl');

export default React.createClass({
  getDefaultProps() {
    return {
      caption: '',
      modifier: '',
    };
  },

  render() {
    return (
      <div className={'bookTag' + (this.props.modifier ? ` bookTag_${this.props.modifier}` : '')}>
        {this.props.caption}
      </div>
    );
  },
});
