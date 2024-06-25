// MODULES
import React from 'react';
import { MdFolderCopy } from 'react-icons/md';

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <MdFolderCopy className={this.props.className} />;
  }
}

export default Folder;
