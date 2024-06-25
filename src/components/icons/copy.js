// MODULES
import React from 'react';
import { IoCopy } from 'react-icons/io5';

class Copy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IoCopy className={this.props.className} />;
  }
}

export default Copy;
