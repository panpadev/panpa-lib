// MODULES
import Web3 from 'web3';
import React from 'react';
import axios from 'axios';
import cn from 'classnames';

// COMPONENTS
import Piechart from '../piechart';
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
class Tokenomics extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};
    this.COLORS = ['#cfc547', '#fa114f', '#caf113', '#f346da', '#a5e3ff'];

    this.init = this.init.bind(this);

    this.refs_load = [];
  }

  init() {
    for (let i = 0; i < this.refs_load.length; i++) {
      this.refs_load[i].current.style.width = this.props.data[i].share + '%';
      this.refs_load[i].current.style.backgroundColor = this.COLORS[i];
    }
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={cn(style['tokenomics'])}>
        <h3 className={cn(style['tokenomics-header'])}>Tokenomics</h3>

        <div className={cn(style['tokenomics-bottom'])}>
          <div className={cn(style['tokenomics-bottom-piechart'])}>
            <Piechart data={this.props.data} colors={this.COLORS} />
          </div>

          <div className={cn(style['tokenomics-bottom-bars'])}>
            {this.props.data.map((current, index) => {
              const ref_load = React.createRef();
              this.refs_load.push(ref_load);

              return (
                <div
                  key={index}
                  className={cn(style['tokenomics-bottom-bars-bar'])}
                >
                  <div
                    className={cn(style['tokenomics-bottom-bars-bar-title'])}
                  >
                    {current.title} {current.share + '%'}
                  </div>

                  <div
                    className={cn(style['tokenomics-bottom-bars-bar-progress'])}
                  >
                    <div
                      ref={ref_load}
                      className={cn(
                        style['tokenomics-bottom-bars-bar-progress-load']
                      )}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Tokenomics.defaultProps = {
  data: [
    { share: 7.5, title: 'Seed sale' },
    { share: 4.8, title: 'Development' },
    { share: 30, title: 'Presale' },
    { share: 50, title: 'Public sale' },
    { share: 7.7, title: 'Airdrop & Campaigns' },
  ],
};

export default Tokenomics;
