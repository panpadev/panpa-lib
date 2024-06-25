// MODULES
import React from 'react';
import { GiSandsOfTime } from 'react-icons/gi';

class SandWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <GiSandsOfTime className={this.props.className} />;
  }
}

export default SandWatch;
