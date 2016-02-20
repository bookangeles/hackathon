require('./booklist.styl');

import BookItem from './bookitem.jsx';
import Cloud from '../elements/cloud.jsx';

export default React.createClass({
  getDefaultProps() {
    return {
      books: [],
      tags: [],
    };
  },

  render() {
    return (
      <div className="bookList">
        {_.map(this.props.books, (book, key) => <BookItem key={key}
          {...book} tags={_.pick(this.props.tags, book.tags)}/>)}
      </div>
    );
  },
});
