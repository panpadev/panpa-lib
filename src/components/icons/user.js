// MODULES
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { TbUserFilled } from 'react-icons/tb';
import { HiUser } from 'react-icons/hi2';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <HiUser className={this.props.className} />;
  }
}

export default User;
