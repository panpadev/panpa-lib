// MODULES
import React from 'react';
import { FaClock } from 'react-icons/fa6';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaClock className={this.props.className} />;
  }
}

export default Clock;
