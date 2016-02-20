require('./booklist.styl');

import BookItem from './bookitem.jsx';
import Cloud from '../elements/cloud.jsx';

let bookList = React.createClass({
  mixins: [Bem],
  getDefaultProps() {
    return {
      books: [],
      tags: [],
    };
  },

  render() {
    return (
      <div className={this.b_()}>
        {_.map(this.props.books, (book, key) => <BookItem key={key}
          {...book} tags={_.pick(this.props.tags, book.tags)}/>)}
      </div>
    );
  },
});

export default bookList;
