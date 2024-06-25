// MODULES
import React from 'react';
import { FaHandPointer } from 'react-icons/fa6';

class Pointer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaHandPointer className={this.props.className} />;
  }
}

export default Pointer;
