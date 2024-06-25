// MODULES
import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <RxHamburgerMenu className={this.props.className} />;
  }
}

export default Hamburger;
