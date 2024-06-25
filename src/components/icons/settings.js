// MODULES
import React from 'react';
import { IoMdSettings } from 'react-icons/io';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IoMdSettings className={this.props.className} />;
  }
}

export default Settings;
