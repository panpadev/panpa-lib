// MODULES
import React from 'react';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// UTILS
import { sleep, fhandle } from '../../utils';

// STYLES
import style from './style.module.css';

// CLIENT SIDE
class Graph extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = { on_resize_timeout_id: 0 };

    this.config_scale = this.config_scale.bind(this);
    this.config_svg = this.config_svg.bind(this);
    this.init = this.init.bind(this);
    this.on_resize = this.on_resize.bind(this);

    // element references
    this.ref_graph = React.createRef();
    this.ref_scale = React.createRef();
    this.ref_lines = React.createRef();
    this.ref_svg = React.createRef();
    this.ref_path = React.createRef();
  }

  config_scale(scale_count = 8) {
    const graph = this.ref_graph.current;
    const scale = this.ref_scale.current;
    const lines = this.ref_lines.current;

    while (scale.firstChild) {
      scale.removeChild(scale.firstChild);
    }

    while (lines.firstChild) {
      lines.removeChild(lines.firstChild);
    }

    const data = [...this.props.data];

    // sort data from highest price to lowest
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[j + 1]) {
          const current = data[j];
          const next = data[j + 1];

          if (current.price < next.price) {
            data[j] = next;
            data[j + 1] = current;
          }
        }
      }
    }

    if (data.length < scale_count) {
      return;
    }

    const dindex = data.length / (scale_count - 1);
    for (let i = 0; i <= data.length; i = i + dindex) {
      let index = parseInt(i);
      if (index >= data.length) {
        index = data.length - 1;
      }

      const scale_item = document.createElement('div');
      scale_item.innerHTML = fhandle(data[index].price);
      scale_item.classList.add(style['graph-scale-item']);
      scale.appendChild(scale_item);

      const lines_item = document.createElement('div');
      lines_item.classList.add(style['graph-lines-item']);

      lines.appendChild(lines_item);
    }
  }

  config_svg() {
    const svg = this.ref_svg.current;
    const scale = this.ref_scale.current;

    // svg width & height calculation
    const parent_rect = svg.parentNode.getBoundingClientRect();

    let graph_padding = getComputedStyle(svg.parentNode).padding; // gets the computed style of the parent which means it has to come from stylesheet files otherwise padding will be ignored
    graph_padding = Number(graph_padding.replace('px', ''));

    let scale_width = getComputedStyle(scale).width;
    scale_width = Number(scale_width.replace('px', ''));

    const width = parent_rect.width - scale_width - graph_padding * 2;
    const height = parent_rect.height - graph_padding * 2;

    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  }

  async init() {
    const svg = this.ref_svg.current;
    const path = this.ref_path.current;

    this.config_svg();
    this.config_scale();

    // sort data from old to new by date
    for (let i = 0; i < this.props.data.length; i++) {
      for (let j = 0; j < this.props.data.length; j++) {
        if (this.props.data[j + 1]) {
          const current = this.props.data[j];
          const next = this.props.data[j + 1];

          if (current.date.valueOf() > next.date.valueOf()) {
            this.props.data[j] = next;
            this.props.data[j + 1] = current;
          }
        }
      }
    }

    // get highest & lowest price data
    let price_highest = this.props.data[0].price;
    let price_lowest = this.props.data[0].price;
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i].price > price_highest) {
        price_highest = this.props.data[i].price;
      }

      if (this.props.data[i].price < price_lowest) {
        price_lowest = this.props.data[i].price;
      }
    }

    const width = Number(svg.getAttribute('width'));
    const height = Number(svg.getAttribute('height'));

    let path_x = 0;
    const price_current = this.props.data[0].price - price_lowest;
    const ratio = price_current / (price_highest - price_lowest);
    let path_y = height - ratio * height;

    // delta x
    const dx = width / this.props.data.length;

    path.setAttribute('d', `M ${path_x} ${path_y}`);

    for (let i = 0; i < this.props.data.length; i++) {
      await sleep(40);

      path_x += dx;

      const price_current = this.props.data[i].price - price_lowest;
      const ratio = price_current / (price_highest - price_lowest);

      path_y = height - ratio * height;

      const d =
        path.getAttribute('d') + ` L ${path_x} ${path_y} M ${path_x} ${path_y}`;

      path.setAttribute('d', d);
    }
  }

  on_resize(e) {
    clearTimeout(this.state.on_resize_timeout_id);

    const timeout_id = setTimeout(() => {
      this.init();
    }, 1000);

    this.setState({
      ...this.state,

      on_resize_timeout_id: timeout_id,
    });
  }

  componentDidMount() {
    this.init();
    window.addEventListener('resize', this.on_resize);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('resize', this.on_resize);
  }

  render() {
    return (
      <div ref={this.ref_graph} className={cn(style['graph'])}>
        <div ref={this.ref_scale} className={cn(style['graph-scale'])}></div>

        <div ref={this.ref_lines} className={cn(style['graph-lines'])}></div>

        <svg ref={this.ref_svg} className={cn(style['graph-svg'])}>
          <path
            ref={this.ref_path}
            stroke={this.props.stroke}
            strokeWidth={this.props.strokeWidth}
            strokeLinecap="round"
            className={cn(style['graph-svg-path'])}
          />
        </svg>
      </div>
    );
  }
}

Graph.defaultProps = {
  strokeWidth: 5,
  stroke: '#0080FF',

  data: [
    { price: 0.1, date: new Date(new Date().valueOf() - 100000) },
    { price: 0.5, date: new Date(new Date().valueOf() - 90000) },
    { price: 1.2, date: new Date(new Date().valueOf() - 80000) },
    { price: 1.2, date: new Date(new Date().valueOf() - 70000) },
    { price: 1.2, date: new Date(new Date().valueOf() - 60000) },
    { price: 1.5, date: new Date(new Date().valueOf() - 58000) },
    { price: 1.7, date: new Date(new Date().valueOf() - 57000) },
    { price: 1.9, date: new Date(new Date().valueOf() - 55000) },
    { price: 2.3, date: new Date(new Date().valueOf() - 53000) },
    { price: 2.2, date: new Date(new Date().valueOf() - 51000) },
    { price: 2.1, date: new Date(new Date().valueOf() - 49000) },
    { price: 3.3, date: new Date(new Date().valueOf() - 47000) },
    { price: 3.5, date: new Date(new Date().valueOf() - 43000) },
    { price: 3.9, date: new Date(new Date().valueOf() - 42000) },
    { price: 3.0, date: new Date(new Date().valueOf() - 40000) },
    { price: 2.7, date: new Date(new Date().valueOf() - 35000) },
    { price: 2.6, date: new Date(new Date().valueOf() - 32000) },
    { price: 2.5, date: new Date(new Date().valueOf() - 30000) },
    { price: 2.3, date: new Date(new Date().valueOf() - 29000) },
    { price: 2.2, date: new Date(new Date().valueOf() - 26000) },
    { price: 2.1, date: new Date(new Date().valueOf() - 22000) },
    { price: 2.0, date: new Date(new Date().valueOf() - 20000) },
    { price: 1.3, date: new Date(new Date().valueOf() - 16000) },
    { price: 2.4, date: new Date(new Date().valueOf() - 13000) },
    { price: 2.5, date: new Date(new Date().valueOf() - 12000) },
    { price: 2.6, date: new Date(new Date().valueOf() - 10000) },
    { price: 2.7, date: new Date(new Date().valueOf() - 7000) },
    { price: 2.9, date: new Date(new Date().valueOf() - 6000) },
    { price: 3.2, date: new Date(new Date().valueOf() - 5000) },
    { price: 3.7, date: new Date(new Date().valueOf() - 4000) },
    { price: 3.2, date: new Date(new Date().valueOf() - 3000) },
    { price: 3.9, date: new Date(new Date().valueOf() - 2000) },
    { price: 4.9, date: new Date(new Date().valueOf() - 1000) },
    { price: 5.9, date: new Date() },
  ],
};

export default Graph;
