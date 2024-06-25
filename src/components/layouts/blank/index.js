// MODULES
import React from 'react';
import cn from 'classnames';
import Script from 'next/script';

// COMPONENTS
import Toaster from '../../toaster';
import Footer from '../../footer';
import Slider from '../../slider';

// CONFIG
import config from '../../../config';

// CONTEXT
import { Context } from '../../../context';

// UTILS
import UTILS from '../../../utils/index.js';
import UTILS_API from '../../../utils/api.js';

// STYLES
import style from './style.module.css';

class BlankLayout extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <Toaster />

        <main className={cn(style['main'])}>{this.props.children}</main>
      </>
    );
  }
}

export default BlankLayout;
