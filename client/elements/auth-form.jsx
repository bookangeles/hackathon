require('./auth-form.styl');
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
const mailRegexp = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

const AuthForm = React.createClass({
  mixins: [Bem],
  getInitialState() {
    return {
      errMail: false,
      errPass: false,
      email: '',
      pass: false,
      canSend: false
    };
  },

  checkMail() {
    let error = '';
    if (!mailRegexp.test(this.state.email))
      error = 'Email has wrong format';
    if (!this.state.email.length)
      error = 'All fields are required';
    this.setState({ errMail: error });
    return !!error;
  },

  validate() {
    let valid = this.checkMail();
    let error = '';
    if (!this.state.pass.length)
      error = 'All fields are required';
    this.setState({ errPass: error });
    valid = !!error && valid;

    this.setState({ canSend: valid });
    return valid;
  },

  send() {
    if (this.validate)
      $.post('/api/clients/login', { email: this.state.email, password: this.state.pass })
      .done(data => {
        $.ajaxSetup({ headers: { 'X-Access-Token': data.id } });
      })
      .fail(data => {
        let errText = 'Wrong auth, please check email and password';
        this.setState({ errPass: errText, errMail: errText, canSend: true });
      });
  },

  handleChange(event) {
    this.setState({
      email: event.target.value,
    });
  },

  passChange(event) {
    this.setState({
      pass: event.target.value,
    });
  },

  render() {
    return (
      <div className={this.b_()}>

        <TextField floatingLabelText="Email" value={this.state.email} className={this.b_('-input')}
        onChange={this.handleChange} onBlur={this.checkMail} onEnterKeyDown={this.send}
        errorText={this.state.errMail} />

        <TextField onChange={this.passChange} onBlur={this.validate} onEnterKeyDown={this.send}
        className={this.b_('-input')} errorText={this.state.errPass}
        floatingLabelText="Password" type="password" />
        <div className={this.b_('-btn')}>
          <RaisedButton label="Log in" nope_disabled={!this.state.canSend || this.state.errMail || this.state.errPass}
          onTouchEnd={this.send} onMouseDown={this.send} />
        </div>
      </div>
      );
  },
});

export default AuthForm;
