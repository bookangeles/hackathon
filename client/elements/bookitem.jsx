require('./bookitem.styl');
import Cloud from '../elements/cloud.jsx';

export default React.createClass({
  getDefaultProps() {
    return {
      title: '',
      author: '',
      tags: [],
    };
  },

  render() {
    const tmp = this.props.title.split(' ');
    const caption = _.first(tmp) + '...' + _.last(tmp);

    return (
      <div className="bookItem">
        <span title={this.props.title}>{caption}</span>
        <Cloud tags={this.props.tags} modifier="inCard" />
      </div>
    );
  },
});
