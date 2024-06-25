// MODULES
import React from 'react';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

class KeyboardArrowDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdKeyboardDoubleArrowDown className={this.props.className} />;
  }
}

export default KeyboardArrowDown;
