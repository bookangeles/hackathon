require('./bookitem.styl');
import Cloud from '../elements/cloud.jsx';

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
    const book = this.props;
    const tmp = this.props.title.split(' ');
    const caption = _.first(tmp) + '...' + _.last(tmp);

    return (
      <div className={this.b_()}>
        <a href={`book/${book.id}`} className={this.b_('-caption')} title={book.title}>{caption}</a>
        <span className={this.b_('-author')} title={book.author}>{book.author}</span>
        <Cloud tags={book.tags} modifier="inCard" />
      </div>
    );
  },
});

export default BookItem;
