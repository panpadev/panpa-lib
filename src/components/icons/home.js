// MODULES
import React from 'react';
import { FaHome } from 'react-icons/fa';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <FaHome className={this.props.className} />;
  }
}

export default Home;
