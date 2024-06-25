// MODULES
import React from 'react';
import { FaWindowClose } from 'react-icons/fa';

class Close extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaWindowClose className={this.props.className} />;
  }
}

export default Close;
