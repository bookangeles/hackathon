import BookList from '../elements/booklist.jsx';
import Cloud from '../elements/cloud.jsx';

const makeKeys = (data = []) =>
  _.reduce(data, (out, item) => _.extend(out, ({ [item.id]: item })), {});

export default React.createClass({
  getInitialState() {
    $.getJSON('/bapi/tags', this.onTagsLoad);

    return {
      books: false,
      tags: false,
    };
  },

  onTagsLoad(data) {
    var tags = makeKeys(data);
    $.getJSON('/bapi/books', (data) => {
      var books = makeKeys(_.sortBy(data, 'createdAt').reverse());
      this.setState({ books, tags });
    });
  },

  render() {
    return (
      <div>
        {this.state.books &&
          <BookList books={this.state.books} tags={this.state.tags} />
        }
        {this.state.tags &&
          <Cloud tags={this.state.tags} />
        }
      </div>
    );
  },
});
