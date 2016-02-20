require('./main.styl');

CanonicalBlock = React.createClass({
  getDefaultProps() {
    return {
      data: []
    }
  },

  render() {
    return (
      <div className="wrapper">
        I'm react component
      </div>
    );
  }
});
module.exports = CanonicalBlock;
