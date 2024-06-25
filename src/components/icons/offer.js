// MODULES
import React from 'react';
import { MdLocalOffer } from 'react-icons/md';

class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdLocalOffer className={this.props.className} />;
  }
}

export default Offer;
