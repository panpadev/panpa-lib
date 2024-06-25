// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS

// CONFIG
import config from '../../config';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Apple extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      index_ratio: 0,
      index: 1,
      container_height: 3000,
    };

    this.on_scroll = this.on_scroll.bind(this);
    this.init = this.init.bind(this);

    this.ref_apple = React.createRef();
  }

  on_scroll(e) {
    const container = this.ref_apple.current;
    const video = container.firstChild;
    const container_top = container.getBoundingClientRect().top;

    //const ratio = video.duration /

    if (container_top > 0) {
      return;
    }

    if (Math.abs(container_top) > this.state.container_height) {
      return;
    }

    const frame = Number(
      (Math.abs(container_top) * this.state.index_ratio).toFixed(3)
    );

    video.currentTime = frame;

    this.setState({
      ...this.state,
    });
    // container is on or passed the top of the window
  }

  init() {
    const container = this.ref_apple.current;
    const video = container.firstChild;

    if (window.innerWidth > 650) {
      container.style.width = '500px';
    } else {
      container.style.width = '100%';
    }

    const container_height =
      Number(getComputedStyle(container).height.replace('px', '')) || 3000;

    this.setState({
      ...this.state,

      // TODO number of files input
      index_ratio: Number((video.duration / container_height).toFixed(3)),
      container_height: container_height,
    });

    window.addEventListener('scroll', this.on_scroll);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('scroll', this.on_scroll);
  }

  render() {
    return (
      <div ref={this.ref_apple} className={cn(style['apple'])}>
        <video className={cn(style['apple-img'])}>
          <source src="/videos/swap.mp4" type="video/mp4" />
        </video>

        {/**
         * 
         *         <img
          className={cn(style['apple-img'])}
          src={`/images/swap/frame${this.state.index}.png`}
        />
         */}
      </div>
    );
  }
}

export default Apple;
