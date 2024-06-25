// MODULES
import React from 'react';
import { MdOutlineSwapVert } from 'react-icons/md';

class Swap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdOutlineSwapVert className={this.props.className} />;
  }
}

export default Swap;
