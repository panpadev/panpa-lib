// MODULES
import React from 'react';
import { MdPrivacyTip } from 'react-icons/md';

class Privacy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdPrivacyTip className={this.props.className} />;
  }
}

export default Privacy;
