// MODULES
import React from 'react';
import { MdFactory } from 'react-icons/md';

class Factory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdFactory className={this.props.className} />;
  }
}

export default Factory;
