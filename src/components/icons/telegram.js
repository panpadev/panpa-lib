// MODULES
import React from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

class Telegram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaTelegramPlane className={this.props.className} />;
  }
}

export default Telegram;
