// MODULES
import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';

class X extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaXTwitter className={this.props.className} />;
  }
}

export default X;
