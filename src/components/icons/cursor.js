// MODULES
import React from 'react';
import { PiCursorTextFill } from 'react-icons/pi';

class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <PiCursorTextFill className={this.props.className} />;
  }
}

export default Cursor;
