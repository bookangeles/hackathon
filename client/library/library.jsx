import BookList from '../elements/booklist.jsx';
import Cloud from '../elements/cloud.jsx';

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
      books: _.get(data, 'books'),
      tags: _.get(data, 'tags'),
    });
  },

  render() {
    return (
      <div>
        <h2>Library</h2>
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
