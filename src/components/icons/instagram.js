// MODULES
import React from 'react';
import { FaInstagram } from 'react-icons/fa';

class Instagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaInstagram className={this.props.className} />;
  }
}

export default Instagram;
