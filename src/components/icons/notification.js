// MODULES
import React from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IoNotificationsOutline className={this.props.className} />;
  }
}

export default Notification;
