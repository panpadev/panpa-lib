// MODULES
import React from 'react';
import { IoIosRadioButtonOn } from 'react-icons/io';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IoIosRadioButtonOn className={this.props.className} />;
  }
}

export default Button;
