// MODULES
import React from 'react';
import { MdRocketLaunch } from 'react-icons/md';

class Rocket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdRocketLaunch className={this.props.className} />;
  }
}

export default Rocket;
