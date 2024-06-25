// MODULES
import React from 'react';
import { MdVerified } from 'react-icons/md';

class Verified extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdVerified className={this.props.className} />;
  }
}

export default Verified;
