// MODULES
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

class Arrow_down extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdOutlineKeyboardArrowDown className={this.props.className} />;
  }
}

export default Arrow_down;
