// MODULES
import React from 'react';
import { FaDiscord } from 'react-icons/fa';

class Discord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaDiscord className={this.props.className} />;
  }
}

export default Discord;
