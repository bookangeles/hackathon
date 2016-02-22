require('./bookitem.styl');
import Cloud from '../elements/cloud.jsx';
import Paper from 'material-ui/lib/paper';
import OpenIcon from 'material-ui/lib/svg-icons/action/open-in-new';

const BookItem = React.createClass({
  mixins: [Bem],
  getDefaultProps() {
    return {
      id: 0,
      title: '',
      author: '',
      tags: [],
    };
  },

  render() {
    const token = _.get(document.cookie.match(/auth_token=(\w+)/), 1);
    const book = this.props;
    const tmp = this.props.fileName.split(' ');
    const caption = tmp.length > 2
      ? _.first(tmp) + '...' + _.last(tmp)
      : this.props.fileName;

    return (
      <Paper className={this.b_()} zDepth={2}>
        <a href={`book/${book.id}`} className={this.b_('-caption')} title={book.fileName}>{caption}</a>
        <a href={`/bapi/books/${book.id}?access_token=${token}`} target="_blank">
          <OpenIcon className={this.b_('-plink')} />
        </a>
        <div className={this.b_('-author')} title={book.author}>{book.author}</div>

        <Cloud tags={book.tags} modifier="inCard" />
      </Paper>
    );
  },
});

export default BookItem;
