// MODULES
import React from 'react';
import { MdOutlineSecurity } from 'react-icons/md';

class Audit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdOutlineSecurity className={this.props.className} />;
  }
}

export default Audit;
