// MODULES
import React from 'react';
import { FaFacebookF } from 'react-icons/fa';

class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaFacebookF className={this.props.className} />;
  }
}

export default Facebook;
