// MODULES
import React from 'react';
import { ImCross } from 'react-icons/im';

class Cross extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <ImCross className={this.props.className} />;
  }
}

export default Cross;
