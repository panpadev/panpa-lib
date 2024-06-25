// MODULES
import React from 'react';
import { ImConnection } from 'react-icons/im';

class Wifi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <ImConnection className={this.props.className} />;
  }
}

export default Wifi;
