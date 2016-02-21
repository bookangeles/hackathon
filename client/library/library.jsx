import BookList from '../elements/booklist.jsx';
import Cloud from '../elements/cloud.jsx';

const makeKeys = (data = []) =>
  _.reduce(data, (out, item) => _.extend(out, ({ [item.id]: item })), {});

export default React.createClass({
  getInitialState() {
    $.getJSON('/mock_library.json', this.onResponse);

    return {
      books: false,
      tags: false,
    };
  },

  onResponse(data) {
    this.setState({
      books: makeKeys(_.get(data, 'books')),
      tags: makeKeys(_.get(data, 'tags')),
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
