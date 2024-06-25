// MODULES
import React from 'react';
import { BiSolidBookAlt } from 'react-icons/bi';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <BiSolidBookAlt className={this.props.className} />;
  }
}

export default Book;
