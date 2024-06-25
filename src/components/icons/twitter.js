// MODULES
import React from 'react';
import { FaTwitter } from 'react-icons/fa';

class Twitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaTwitter className={this.props.className} />;
  }
}

export default Twitter;
