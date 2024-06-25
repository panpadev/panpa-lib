// MODULES
import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';

class Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaCheckSquare className={this.props.className} />;
  }
}

export default Check;
