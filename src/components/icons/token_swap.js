// MODULES
import React from 'react';
import { RiTokenSwapFill } from 'react-icons/ri';

class TokenSwap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <RiTokenSwapFill className={this.props.className} />;
  }
}

export default TokenSwap;
