// MODULES
import React from 'react';
import { IoLogInOutline } from 'react-icons/io5';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IoLogInOutline className={this.props.className} />;
  }
}

export default Login;
