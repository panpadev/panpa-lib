// MODULES
import React from 'react';
import { IoIosWarning } from 'react-icons/io';

class Warning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IoIosWarning className={this.props.className} />;
  }
}

export default Warning;
