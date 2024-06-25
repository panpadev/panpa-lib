// MODULES
import React from 'react';
import { FaRedditAlien } from 'react-icons/fa';

class Reddit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaRedditAlien className={this.props.className} />;
  }
}

export default Reddit;
