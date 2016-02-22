require('./react-tag.styl');

import { WithContext as ReactTags } from 'react-tag-input';

const CustomTags = React.createClass({
  mixins: [Bem],
  getDefaultProps() {
    return {
      onUpdate: _.noop
    };
  },
  getInitialState() {
    this.availableTags = [];
    $.get('/bapi/tags', (data) => {
      data = _.filter(data);
      this.availableTags = data;
      this.setState({ suggestions: _(data).pluck('caption').filter().value() });
    })
    return {
      tags: [],
      suggestions: []
    };
  },

  // tags
  // TODO:
  // - [x] create new tags
  // - [x] remove old input
  // - [x] attach tags to form
  // - [x] handle delete
  // - [ ] use material-ui input
  // - [ ] styling
  // - [x] fix import (replace require with import)
  // - [x] handle drag
  // - [ ] fix deletion bug (see below)

  // TODO: have a bug here
  // steps to reproduce:
  // - given tags `xxx` and `xcc`
  // - add tags `xxx` and `xcc`
  // - remove tag `xxx`
  // - add tag `xxx` again`
  // - get `Encountered two children with the same key` error

  handleDelete: function(ind) {
    var tags = [].concat(this.state.tags);
    var tag = tags.splice(ind, 1)[0];
    var suggestions = [].concat(this.state.suggestions);
    suggestions.push(tag.text);
    this.setState({
      suggestions, tags
    });
    this.updateParent(tags);
  },

  updateParent(tags) {
    tags = tags.map(tag => _.find(this.availableTags, x => x.caption == tag.text))
    this.props.onUpdate(tags);
  },

  handleAddition: function(tag) {
    var tags = [].concat(this.state.tags);
    if (_(tags).pluck('text').includes(tag)) {
      return;
    }

    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({ tags });

    if (_.includes(this.state.suggestions, tag)) {
      this.setState({ suggestions: _.reject(this.state.suggestions, (el) => { return el === tag; }) })
    } else {
      // Create new tag
      $.post('/bapi/tags', {
        color: _.sample(['grey', 'blue', 'green', 'yellow', 'orange', 'red']),
        caption: tag
      }, (data) => {
        this.availableTags.push(data);
        this.updateParent(tags);
      });
    }

  },

  handleDrag: function(tag, currPos, newPos) {
    var tags = [].concat(this.state.tags);

    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);
    this.setState({ tags });
  },

  render() {
    return (
      <div className={this.b_()}>
        <ReactTags tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
          handleDrag={this.handleDrag} />
      </div>
    );
  }
});

export default CustomTags;
