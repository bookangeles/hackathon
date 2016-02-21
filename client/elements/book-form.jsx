require('./book-form.styl');

export default React.createClass({
  getDefaultProps() {
    return {
    }
  },

  render() {
    return (
      <div>
      <form className="bookForm">
        <p><label htmlFor="form_title">Book title</label><input id="form_title" name="title"/></p>
        <p><label htmlFor="form_author">Book author</label><input id="form_author" name="author"/></p>
        <p><label htmlFor="form_file">File</label><input id="form_file" type="file" name="file"/></p>
        <p><label htmlFor="form_tags">Tags</label><input id="form_tags" name="tags"/></p>
        <p><label htmlFor="form_cover">Book cover link</label><input id="form_cover" name="cover"/></p>
        <p><label htmlFor="form_note">Note</label><textarea id="form_note" name="note"/></p>
        <input type="submit" value="Submit"/>
      </form>
      </div>
    );
  }
});
