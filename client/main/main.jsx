require('./main.styl');

const CanonicalBlock = React.createClass({
  getDefaultProps() {
    return {
      data: []
    }
  },

  render() {
    return (
      <div className="wrapper">
        I'm react component sdfsd
      </div>
    );
  }
});

ReactDOM.render(
  <CanonicalBlock />,
  document.getElementById('spa')
)

module.exports = CanonicalBlock;

ReactDOM.render(<CanonicalBlock />, document.getElementById('content'));
