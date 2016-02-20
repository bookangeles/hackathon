require('./tag.styl');

export default React.createClass({
  getDefaultProps() {
    return {
      caption: ''
    }
  },

  render() {
    return (
      <div className="bookTag">
        {this.props.caption}
      </div>
    );
  }
});
