// MODULES
import React from 'react';
import Image from 'next/image';
import Web3 from 'web3';
import cn from 'classnames';

// COMPONENTS
import Icon_arrow_down from '../../../icons/arrow_down';
import Icon_check from '../../../icons/check';
import Icon_hamburger from '../../../icons/hamburger';
import Icon_home from '../../../icons/home';
import Icon_swap from '../../../icons/token_swap';
import Icon_factory from '../../../icons/factory';
import Icon_audit from '../../../icons/audit';
import Icon_user from '../../../icons/user';
import Icon_login from '../../../icons/login';
import Icon_offer from '../../../icons/offer';

// CONFIG
import config from '../../../../config';

// CONTEXT
import { Context } from '../../../../context';

// UTILS
import { wallet_connect } from '../../../../utils/index.js';

// STYLES
import style from './style.module.css';

class EditorHeader extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {
      nav_open: false,

      // dropdowns
      chain_selector_open: false,
    };

    this.CHAINS = config.blockchain_chains;

    // functions
    this.on_click_chain_selector = this.on_click_chain_selector.bind(this);
    this.listen_wallet = this.listen_wallet.bind(this);

    // refs
    this.ref_header = React.createRef();
    this.ref_main = React.createRef();
  }

  async on_click_chain_selector(e, index) {
    const chain_id = Number(Object.keys(this.CHAINS)[index]);

    try {
      await wallet_connect(chain_id);
    } catch (err) {
      if (err.code === 4001) {
        return;
      }

      if (err.code === 4902) {
        const missing_chains = {
          56: {
            chainId: '0x38',
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'Binance Coin',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com'],
          },
          137: {
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
              name: 'MATIC Token',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-mainnet.matic.quiknode.pro'],
            blockExplorerUrls: ['https://polygonscan.com/'],
          },
          42161: {
            chainId: '0xa4b1',
            chainName: 'Arbitrum Mainnet',
            nativeCurrency: {
              name: 'Arbitrum',
              symbol: 'ARB',
              decimals: 18,
            },
            rpcUrls: ['https://arb1.arbitrum.io/rpc'],
            blockExplorerUrls: ['https://arbiscan.io/'],
          },
          43114: {
            chainId: '0xA86A',
            chainName: 'Avalanche Mainnet C-Chain',
            nativeCurrency: {
              name: 'Avalanche',
              symbol: 'AVAX',
              decimals: 18,
            },
            rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            blockExplorerUrls: ['https://snowtrace.io/'],
          },
        };

        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [missing_chains[Number(chain_id)]],
        });
      }
    }

    this.setState({
      ...this.state,

      // wallet
      wallet_chain_id: chain_id,

      // dropdown
      chain_selector_open: false,
    });

    this.context.set_state({
      ...this.context.state,

      // wallet
      wallet_chain_id: chain_id,
    });
  }

  listen_wallet() {
    if (!window.ethereum) {
      return;
    }

    const web3 = new Web3(window.ethereum);

    web3.provider.on('message', async () => {
      // ...
    });

    web3.provider.on('connect', async () => {
      // ...
    });

    web3.provider.on('disconnect', async () => {
      // ...
    });

    // Accounts changed
    web3.provider.on('accountsChanged', async () => {
      // ...

      const accounts = await web3.eth.getAccounts();
      const chain_id = await web3.eth.getChainId();

      if (!accounts[0]) {
        this.setState({
          ...this.state,

          // wallet
          wallet_accounts: accounts,
        });

        return;
      }

      this.setState({
        ...this.state,

        // wallet
        wallet_accounts: accounts,
      });

      this.context.set_state({
        ...this.context.state,

        wallet_accounts: accounts,
      });
    });

    // Chain changed
    web3.provider.on('chainChanged', async () => {
      // ...

      this.setState({
        ...this.state,

        // common
        loading: true,
      });

      const accounts = await web3.eth.getAccounts();
      const chain_id = await web3.eth.getChainId();

      if (!this.CHAINS[Number(chain_id)]) {
        this.setState({
          ...this.state,

          // common
          loading: false,
        });

        return;
      }

      this.setState({
        ...this.state,

        // common
        loading: false,

        // wallet
        wallet_chain_id: Number(chain_id),
      });

      this.context.set_state({
        ...this.context.state,

        wallet_chain_id: Number(chain_id),
      });
    });
  }

  componentDidMount() {
    this.listen_wallet();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <header
          ref={this.ref_header}
          className={cn(
            style['header'],
            this.props.mobile ? style['headermobile'] : null
          )}
        >
          <nav
            className={cn(
              style['header-nav'],
              this.state.nav_open ? style['header-navopen'] : null
            )}
          >
            <a className={cn(style['header-nav-link'])} href={config.url_ui}>
              <Icon_home />
              Home
            </a>

            <a
              className={cn(style['header-nav-link'])}
              href={config.url_ui + '/factory'}
            >
              <Icon_factory />
              Token Factory
            </a>

            <a
              className={cn(style['header-nav-link'])}
              href={config.url_ui + '/swap'}
            >
              <Icon_swap />
              Swap
            </a>

            <a
              className={cn(style['header-nav-link'])}
              href={config.url_ui + '/audit'}
            >
              <Icon_audit />
              Audit
            </a>

            <a
              className={cn(style['header-nav-link'])}
              id={cn(style['header-nav-linkseedsale'])}
              href={config.url_ui + '/seed-sale'}
            >
              <Icon_offer />
              Seed sale
            </a>

            <a
              className={cn(
                style['header-nav-link'],
                style['header-nav-linkauth']
              )}
              href={
                config.url_ui +
                (this.context.state.user_auth ? '/profile' : '') +
                (this.context.state.user_auth === false ? '/signin' : '')
              }
            >
              {this.context.state.user_auth ? <Icon_user /> : null}
              {this.context.state.user_auth === false ? <Icon_login /> : null}

              {this.context.state.user_auth ? 'Profile' : null}
              {this.context.state.user_auth === false ? 'Sign In' : null}
            </a>
          </nav>

          <div className={cn(style['header-left'])}>
            <div
              onClick={(e) => {
                this.setState({
                  ...this.state,

                  nav_open: !this.state.nav_open,
                });
              }}
              className={cn(style['header-left-hamburger'])}
            >
              <Icon_hamburger />
            </div>
          </div>

          <div className={cn(style['header-right'])}>
            <div className={cn(style['header-right-chain'])}>
              <div
                onClick={(e) => {
                  this.setState({
                    ...this.state,

                    // dropdown
                    chain_selector_open: !this.state.chain_selector_open,
                  });
                }}
                className={cn(style['header-right-chain-selected'])}
              >
                <Image
                  src={
                    this.CHAINS[this.context.state.wallet_chain_id].token_img
                  }
                  width="100"
                  height="100"
                  alt={this.CHAINS[this.context.state.wallet_chain_id].name}
                  className={cn(style['header-right-chain-selected-img'])}
                />

                <div className={cn(style['header-right-chain-selected-title'])}>
                  {this.CHAINS[this.context.state.wallet_chain_id].token_name}
                </div>

                <div className={cn(style['header-right-chain-selected-icon'])}>
                  <Icon_arrow_down />
                </div>
              </div>

              {this.state.chain_selector_open ? (
                <div className={cn(style['header-right-chain-dropdown'])}>
                  {Object.values(this.CHAINS).map((current, index) => {
                    return (
                      <div
                        key={index}
                        className={cn(
                          style['header-right-chain-dropdown-item']
                        )}
                        onClick={(e) => {
                          this.on_click_chain_selector(e, index);
                        }}
                      >
                        <Image
                          className={cn(
                            style['header-right-chain-dropdown-item-img']
                          )}
                          src={current.token_img}
                          width="100"
                          height="100"
                          alt={current.name}
                        />

                        <div
                          className={cn(
                            style['header-right-chain-dropdown-item-title']
                          )}
                        >
                          {current.token_name}
                        </div>

                        {this.context.state.wallet_chain_id ===
                        Number(Object.keys(this.CHAINS)[index]) ? (
                          <div
                            className={cn(
                              style[
                                'header-right-chain-dropdown-item-checkicon'
                              ]
                            )}
                          >
                            <Icon_check />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default EditorHeader;
