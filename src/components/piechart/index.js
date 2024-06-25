// MODULES
import Web3 from 'web3';
import React from 'react';
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
class Piechart extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {};

    this.draw = this.draw.bind(this);

    this.ref_piechart = React.createRef();
    this.ref_canvas = React.createRef();
  }

  draw() {
    const piechart = this.ref_piechart.current;
    const canvas = this.ref_canvas.current;
    const colors = this.props.colors || [
      '#cfc547',
      '#ffa233',
      '#f346da',
      '#fa114f',
    ];

    piechart.style.width = this.props.c + 'px';
    piechart.style.height = this.props.c + 'px';

    const context = canvas.getContext('2d');

    context.lineWidth = 32;

    const PI = 3.141592;
    const r = canvas.width / 2 - context.lineWidth / 2;

    let angle_start = 0;
    let angle_end = 0;

    const data = this.props.data;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < data.length; i++) {
      context.strokeStyle = colors[i];
      context.beginPath();

      angle_end += (data[i].share / 100) * (PI * 2) + 0.014;

      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        r,
        angle_start,
        angle_end
      );
      context.stroke();

      angle_start = angle_end - 0.014;
    }
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        key={this.props.key}
        ref={this.ref_piechart}
        className={cn(style['piechart'])}
      >
        <div className={cn(style['piechart-header'])}>{this.props.header}</div>

        <canvas
          width={this.props.c}
          height={this.props.c}
          className={cn(style['piechart-canvas'])}
          ref={this.ref_canvas}
        ></canvas>
      </div>
    );
  }
}

Piechart.defaultProps = {
  data: [
    { share: 36, title: 'Test' },
    { share: 30, title: 'Seed sale' },
    { share: 34, title: 'Development' },
  ],
  c: 200,
  header: 'DEVC',
};

export default Piechart;
