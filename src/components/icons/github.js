// MODULES
import React from 'react';
import { FaGithub } from 'react-icons/fa';

class Github extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaGithub className={this.props.className} />;
  }
}

export default Github;
