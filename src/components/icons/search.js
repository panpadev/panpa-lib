// MODULES
import React from 'react';
import { IoIosSearch } from 'react-icons/io';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <IoIosSearch className={this.props.className} />;
  }
}

export default Search;
