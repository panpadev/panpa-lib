// MODULES
import Web3 from 'web3';
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import cn from 'classnames';

// COMPONENTS
import Icon_arrow_down from '../icons/arrow_down';
import Icon_loading from '../icons/loading';

// CONFIG
import config from '../../config';

// CONTEXT
import { Context } from '../../context';

// UTILS
import { wallet_connect, str_copy } from '../../utils/index.js';

// STYLES
import style from './style.module.css';

// CLIENT SIDE
class Slider extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      spawn_interval_id: 0,
      cleanup_interval_id: 0,
      resize_timeout_id: 0,
    };

    this.on_visibility_change = this.on_visibility_change.bind(this);
    this.on_resize = this.on_resize.bind(this);
    this.init = this.init.bind(this);

    this.ref_slider = React.createRef();
  }

  on_visibility_change(e) {
    if (document.visibilityState !== 'visible') {
      clearInterval(this.state.spawn_interval_id);
      clearInterval(this.state.cleanup_interval_id);

      return;
    }

    this.init();
  }

  on_resize() {
    clearInterval(this.state.spawn_interval_id);
    clearInterval(this.state.cleanup_interval_id);

    clearTimeout(this.state.resize_timeout_id);

    const resize_timeout_id = setTimeout(() => {
      const slider = this.ref_slider.current;

      for (let i = 0; i < slider.children.length; i++) {
        slider.removeChild(slider.children[0]);
      }

      this.init();
    }, 1000);

    this.state.resize_timeout_id = resize_timeout_id;
  }

  init() {
    const slider = this.ref_slider.current;
    const slider_x = slider.getBoundingClientRect().x;
    const slider_width = slider.getBoundingClientRect().width + 200;

    const item = document.createElement('div');
    item.classList.add(style['slider-item']);
    item.innerHTML = '$PANPA';

    slider.appendChild(item);

    const animation_duration = Number(
      getComputedStyle(item).animationDuration.replace('s', '')
    );

    const item_x = item.getBoundingClientRect().x;
    const item_width = item.getBoundingClientRect().width + 10;

    const spawn_time =
      (animation_duration / (slider_width / item_width)) * 1000;

    const spawn_interval_id = setInterval(() => {
      const item = document.createElement('div');
      item.classList.add(style['slider-item']);
      item.innerHTML = '$PANPA';

      slider.appendChild(item);
    }, spawn_time);

    const cleanup_interval_id = setInterval(() => {
      for (let i = 0; i < slider.children.length; i++) {
        const citem = slider.children[i];

        if (citem.getBoundingClientRect().x < slider_x - item_width) {
          slider.removeChild(citem);
        }
      }
    }, 5000);

    this.setState({
      ...this.state,

      spawn_interval_id: spawn_interval_id,
      cleanup_interval_id: cleanup_interval_id,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.init();
    }, 1000);

    window.addEventListener('resize', this.on_resize);

    document.addEventListener('visibilitychange', this.on_visibility_change);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('resize', this.on_resize);

    document.removeEventListener('visibilitychange', this.on_visibility_change);
  }

  render() {
    return <div ref={this.ref_slider} className={cn(style['slider'])}></div>;
  }
}

export default Slider;
