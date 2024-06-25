// MODULES
import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

// CONTEXT
import { Context } from '../../context';

// UTILS
import { sleep, fhandle } from '../../utils';

// STYLES
import style from './style.module.css';

// CLIENT SIDE
class Table extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = { on_resize_timeout_id: 0 };

    this.init = this.init.bind(this);
    this.on_resize = this.on_resize.bind(this);

    // element references
    this.ref_table = React.createRef();
  }

  async init() {}

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
      <div ref={this.ref_table} className={cn(style['table'])}>
        <div className={cn(style['table-left'])}>
          <div className={cn(style['table-left-header'])}>
            <div className={cn(style['table-left-header-index'])}>#</div>
            <div className={cn(style['table-left-header-name'])}>Name</div>
          </div>

          {this.props.data.map((current, index) => {
            return (
              <div key={index} className={cn(style['table-left-item'])}>
                <div className={cn(style['table-left-item-index'])}>
                  {index + 1}
                </div>

                <Image
                  className={cn(style['table-left-item-img'])}
                  src={current.img}
                  width="30"
                  height="30"
                  alt={current.symbol}
                />

                <div className={cn(style['table-left-item-info'])}>
                  <div className={cn(style['table-left-item-info-name'])}>
                    {current.name}
                  </div>

                  <div className={cn(style['table-left-item-info-symbol'])}>
                    {current.symbol}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={cn(style['table-rightscroller'])}>
          <div className={cn(style['table-right'])}>
            <div className={cn(style['table-right-header'])}>
              <div className={cn(style['table-right-header-price'])}>Price</div>

              <div className={cn(style['table-right-header-change24h'])}>
                24h %
              </div>

              <div className={cn(style['table-right-header-marketcap'])}>
                Market Cap
              </div>

              <div
                className={cn(style['table-right-header-circulatingsupply'])}
              >
                Circulating Supply
              </div>
            </div>

            {this.props.data.map((current, index) => {
              return (
                <div key={index} className={cn(style['table-right-item'])}>
                  <div className={cn(style['table-right-item-price'])}>
                    {current.price}
                  </div>

                  <div className={cn(style['table-right-item-change24h'])}>
                    {current.change24h}
                  </div>

                  <div className={cn(style['table-right-item-marketcap'])}>
                    {current.market_cap}
                  </div>

                  <div
                    className={cn(style['table-right-item-circulatingsupply'])}
                  >
                    {current.circulating_supply}
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

Table.defaultProps = {
  data: [
    {
      name: 'Ethereum',
      symbol: 'ETH',
      img: '/images/ethereum.png',
      chain_id: 1,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
      price: 0,
      change24h: 0,
      market_cap: 0,
      circulating_supply: 0,
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      img: '/images/ethereum.png',
      chain_id: 1,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
      price: 0,
      change24h: 0,
      market_cap: 0,
      circulating_supply: 0,
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      img: '/images/ethereum.png',
      chain_id: 1,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
      price: 0,
      change24h: 0,
      market_cap: 0,
      circulating_supply: 0,
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      img: '/images/ethereum.png',
      chain_id: 1,
      address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      decimals: 18,
      price: 0,
      change24h: 0,
      market_cap: 0,
      circulating_supply: 0,
    },
  ],
};

export default Table;
