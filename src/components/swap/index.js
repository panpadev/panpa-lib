// MODULES
import React from 'react';
import Image from 'next/image';
import Web3 from 'web3';
import axios from 'axios';
import cn from 'classnames';

// COMPONENTS
import Icon_settings from '../icons/settings.js';
import Icon_arrow_down from '../icons/arrow_down.js';
import Icon_swap from '../icons/swap.js';
import Icon_search from '../icons/search.js';
import Icon_loading from '../icons/loading.js';

// CONFIG
import config from '../../config';

// CONTEXT
//import { Context } from '../../context/index.js';

// UTILS
import { fhandle, wallet_connect } from '../../utils/index.js';

// STYLES
import style from './style.module.css';

// CLIENT SIDE
class Swap extends React.Component {
  //static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {
      // common
      loading: true,
      error: '', // detailed explanation of the current error

      // wallet
      wallet_accounts: [],
      wallet_chain_id: 1, // default 1 (ETH Mainnet)
      wallet_estimated_gas: '0',
      wallet_allowances: [],

      settings_open: false,
      settings_slippage: 0.01, // 0x slippage 0.01 = 1%
      settings_deadline: '',

      // pay token
      pay_value: '',
      pay_value_timeout: 0,
      pay_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      pay_img: '/images/ethereum.png',
      pay_symbol: 'ETH',
      pay_name: 'Ethereum',
      pay_decimals: 18,
      pay_chain_id: 1,
      pay_price: 0.0,
      pay_balance: 0,
      pay_selector_open: false,
      pay_tokens: [],
      pay_search_value: '',
      pay_search_timeout: 0,

      // TODO: set receive token to be USDC, not tether
      // receive token
      receive_value: '',
      receive_value_timeout: 0,
      receive_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      receive_img: '/images/usdc.png',
      receive_symbol: 'USDC',
      receive_name: 'USDC',
      receive_decimals: 6,
      receive_chain_id: 1,
      receive_price: 0.0,
      receive_balance: 0,
      receive_selector_open: false,
      receive_tokens: [],
      receive_search_value: '',
      receive_search_timeout: 0,

      //  button states
      button_text: 'Connect wallet',
      button_disabled: false,
      button_state: 'CONNECT',
    };

    ////////////////////////
    // CONSTANTS
    ////////////////////////
    this.ABI_ERC20 = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_from',
            type: 'address',
          },
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
          {
            name: '_spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
    ];
    this.CHAINS = config.blockchain_chains;
    this.TIMEOUT_MS = 700;

    ////////////////////////
    // Functions
    ////////////////////////
    this.on_click_settings = this.on_click_settings.bind(this);

    this.on_change_pay_value = this.on_change_pay_value.bind(this);
    this.on_change_pay_search = this.on_change_pay_search.bind(this);
    this.on_click_pay_selector = this.on_click_pay_selector.bind(this);

    this.on_replace_tokens = this.on_replace_tokens.bind(this);

    this.on_change_receive_value = this.on_change_receive_value.bind(this);
    this.on_change_receive_search = this.on_change_receive_search.bind(this);
    this.on_click_receive_selector = this.on_click_receive_selector.bind(this);

    this.fetch_0x = this.fetch_0x.bind(this);
    this.on_click_button = this.on_click_button.bind(this);

    this.listen_wallet = this.listen_wallet.bind(this);

    this.init = this.init.bind(this);

    ////////////////////////
    // References
    ////////////////////////
    this.ref_swap = React.createRef();
  }

  on_click_settings() {
    this.setState({
      ...this.state,
      settings_open: !this.state.settings_open,
      pay_selector_open: false,
      receive_selector_open: false,
    });
  }

  on_change_pay_value(e) {
    const value = e.target.value;

    if (isNaN(Number(value))) {
      return;
    }

    clearTimeout(this.state.pay_value_timeout);

    if (value === '' || Number(value) === 0) {
      // TODO: button_text is still 'Enter an amount' when wallet is not connected, user has to type something to connect wallet

      this.setState({
        ...this.state,

        //common
        loading: false,
        error: '',

        // pay
        pay_value: value,
        pay_value_timeout: 0,

        // receive
        receive_value: '',

        // button
        button_disabled: true,
        button_text: 'Enter an amount',
      });

      return;
    }

    const pay_value_timeout = setTimeout(() => {
      let sell_amount = Number(value);
      for (let i = 0; i < this.state.pay_decimals; i++) {
        sell_amount = sell_amount * 10;
      }

      // BigInt throws error when value is a non-float
      if (sell_amount % 1 !== 0) {
        sell_amount = parseInt(sell_amount);
      }

      sell_amount = BigInt(sell_amount).toString();

      let url_query = `?buyToken=${this.state.receive_address}&sellToken=${this.state.pay_address}&sellAmount=${sell_amount}&chain_id=${this.state.wallet_chain_id}`;

      if (this.state.wallet_accounts[0]) {
        url_query =
          url_query + '&takerAddress=' + this.state.wallet_accounts[0];
      }

      // quote 0x.org  endpoint
      const url = this.props.baseURL + '/quote' + url_query;

      this.fetch_0x(url).then(async (res) => {
        if (res === 'err-liquidity') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens",

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Insufficient liquidity!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-limit') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              'Too many requests, please wait a second before making another request.',

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Rate limit!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-balance') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "You don't have enough " +
              this.state.pay_symbol +
              ' to make the trade',

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Insufficient balance!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-allowance') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              'You can set an allowance for ' +
              this.state.pay_symbol +
              ' token',

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Set allowance (' + this.state.pay_symbol + ')',
            button_state: 'ALLOWANCE',
          });

          return;
        }

        if (res === 'err-balance-allowance') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "You don't have allowance for " +
              this.state.pay_symbol +
              ' token. ' +
              'Click to set allowance for ' +
              this.state.pay_symbol +
              ' token',

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Set allowance (' + this.state.pay_symbol + ')',
            button_state: 'ALLOWANCE',
          });

          return;
        }

        if (res === 'err-auth') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'One of the tokens is not authorized for trade',

            wallet_estimated_gas: '',

            // button
            button_text: 'Not Authorized',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-unknown') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'an unknown error occured',

            wallet_estimated_gas: '',

            // button
            button_text: 'Something went wrong',
            button_disabled: true,
          });

          return;
        }

        let buy_amount = Number(res.data.buyAmount);
        for (let i = 0; i < this.state.receive_decimals; i++) {
          buy_amount *= 0.1;
        }

        const state = {
          ...this.state,

          //common
          loading: false,
          error: '', // successfull quote from 0x means no liquidity errors as it includes both tokens

          wallet_estimated_gas: res.data.estimatedGas,

          // pay token

          // receive token
          receive_value: fhandle(buy_amount, 5),

          // button
          button_text: 'Swap',
          button_disabled: false,
        };

        if (!window.ethereum) {
          state.button_text = 'Install web3 wallet';
          state.button_disabled = true;

          this.setState(state);

          return;
        }

        if (!this.state.wallet_accounts[0]) {
          state.button_text = 'Connect wallet';
          state.button_disabled = false;

          this.setState(state);

          return;
        }

        const web3 = new Web3(window.ethereum);
        const chain_id = await web3.eth.getChainId();

        if (!this.CHAINS[Number(chain_id)]) {
          state.button_text = 'Unsupported chain';
          state.button_disabled = true;

          this.setState(state);

          return;
        }

        state.button_state = 'SWAP';

        this.setState(state);
      });
    }, this.TIMEOUT_MS);

    // update pay value input and loading
    this.setState({
      ...this.state,

      //common
      loading: true,
      error: '', // clear error right away on input then wait for 0x response for error check

      // pay token
      pay_value: value,
      pay_value_timeout: pay_value_timeout,

      // receive token
      receive_value: '',

      // button
      button_text: 'Fetching',
      button_disabled: false,
    });
  }

  on_change_pay_search(e) {
    const value = e.target.value;

    clearTimeout(this.state.pay_search_timeout);

    const timeout = setTimeout(async () => {
      const url_tokens =
        config.url_api +
        `/v1/tokens?search=${value}&chain_id=${this.state.wallet_chain_id}`;

      const res = await axios.get(url_tokens);

      this.setState({
        ...this.state,
        // common
        loading: false,

        // pay tokens
        pay_tokens: res.data,
      });
    }, this.TIMEOUT_MS); // TODO: make a global wait time for delayed api calls interval

    this.setState({
      ...this.state,
      // common
      loading: true,

      // pay token
      pay_search_timeout: timeout,
      pay_search_value: value,
    });
  }

  on_click_pay_selector(current) {
    // USDC info on selected chain
    const usdc_address = this.CHAINS[this.state.wallet_chain_id].usdc_address;
    const usdc_decimals = this.CHAINS[this.state.wallet_chain_id].usdc_decimals;

    let sell_amount = '1'; // sell amount is static to get the price of selected token
    for (let i = 0; i < usdc_decimals; i++) {
      sell_amount += '0';
    }

    // price url query
    const url_query = `?buyToken=${current.address}&sellToken=${usdc_address}&sellAmount=${sell_amount}&chain_id=${this.state.wallet_chain_id}`;

    // final 0x.org url price
    const url_price = this.props.baseURL + '/price' + url_query;

    // get selected tokens price async
    this.fetch_0x(url_price).then(async (res) => {
      // if usdc addresses are same, just go on by setting loading false,
      if (usdc_address.toLowerCase() === current.address.toLowerCase()) {
        this.setState({
          ...this.state,

          // common
          loading: false,

          // pay token
          pay_price: 1.0,

          // button
          //button_disabled: false,
        });

        return;
      }

      if (res === 'err-liquidity') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

          // pay token
          pay_price: 0.0,

          // button

          button_text: 'Insufficient liquidity!',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-limit') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            'Too many requests, please wait a second before making another request.',

          // pay token
          pay_price: 0.0,

          // button

          button_text: 'Rate limit!',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-auth') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error: 'One of the tokens is not authorized for trade',

          // pay token
          pay_price: 0,

          // button
          button_text: 'Not Authorized',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-unknown') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error: 'An unknown error occured',

          // pay token
          pay_price: 0,

          // button
          button_text: 'Something went wrong',
          button_disabled: true,
        });

        return;
      }

      let price = Number(res.data.buyAmount);
      for (let i = 0; i < current.decimals; i++) {
        price = Number(price * 0.1);
      }

      price = 1.0 / price;

      const new_state = {
        ...this.state,

        // common
        loading: false,
        error: '',

        // pay token
        pay_price: Number(price),

        // button
        button_text: 'Enter an amount',
        button_disabled: true,
      };

      if (!window.ethereum) {
        new_state.button_text = 'Install web3 wallet';
        new_state.button_disabled = true;

        this.setState(new_state);

        return;
      }

      if (!this.state.wallet_accounts[0]) {
        new_state.button_text = 'Connect wallet';
        new_state.button_disabled = false;

        this.setState(new_state);

        return;
      }

      const web3 = new Web3(window.ethereum);
      const chain_id = await web3.eth.getChainId();

      if (!this.CHAINS[Number(chain_id)]) {
        new_state.button_text = 'Unsupported chain';
        new_state.button_disabled = true;

        this.setState(new_state);

        return;
      }

      this.setState(new_state);
    });

    // TODO!: get quote from both tokens to see if either of them has insufficient liquidity.

    if (current.address === this.state.receive_address) {
      this.setState({
        ...this.state,

        // common
        loading: true,
        error: '',

        // pay token
        pay_value: '',
        pay_address: current.address,
        pay_img: current.img,
        pay_symbol: current.symbol,
        pay_name: current.name,
        pay_decimals: current.decimals,
        pay_chain_id: current.chain_id,
        pay_price: 0.0,
        pay_balance: 0.0,
        pay_selector_open: false,
        pay_search_value: '',

        // receive token
        receive_value: '',
        receive_address: this.state.pay_address,
        receive_img: this.state.pay_img,
        receive_symbol: this.state.pay_symbol,
        receive_name: this.state.pay_name,
        receive_decimals: this.state.pay_decimals,
        receive_chain_id: this.state.pay_chain_id,
        receive_price: this.state.pay_price,
        receive_balance: this.state.pay_balance,
      });

      return;
    }

    this.setState({
      ...this.state,

      // common
      loading: true,
      error: '',

      // pay token
      pay_value: '',
      pay_address: current.address,
      pay_img: current.img,
      pay_symbol: current.symbol,
      pay_name: current.name,
      pay_decimals: current.decimals,
      pay_chain_id: current.chain_id,
      pay_price: 0.0,
      pay_balance: 0.0,
      pay_selector_open: false,
      pay_search_value: '',

      // receive token
      receive_value: '',
    });
  }

  on_change_receive_value(e) {
    const value = e.target.value;

    // only numbers
    if (isNaN(Number(value))) {
      return;
    }

    clearTimeout(this.state.receive_value_timeout);

    if (value === '' || Number(value) === 0) {
      this.setState({
        ...this.state,

        //common
        loading: false,

        // pay
        receive_value: value,
        receive_value_timeout: 0,

        // receive
        pay_value: '',

        // button
        button_text: 'Enter an amount',
        button_disabled: true,
      });

      return;
    }

    const receive_value_timeout = setTimeout(() => {
      let buy_amount = Number(value);
      for (let i = 0; i < this.state.receive_decimals; i++) {
        buy_amount = buy_amount * 10;
      }

      if (buy_amount % 1 !== 0) {
        buy_amount = parseInt(buy_amount);
      }

      buy_amount = BigInt(buy_amount).toString();

      let url_query = `?buyToken=${this.state.receive_address}&sellToken=${this.state.pay_address}&buyAmount=${buy_amount}&chain_id=${this.state.wallet_chain_id}`;

      // TODO Warning: fetch quote with takerAddress to be ableto calculate gas more accurate
      if (this.state.wallet_accounts[0]) {
        url_query =
          url_query + '&takerAddress=' + this.state.wallet_accounts[0];
      }

      // Make a quote request to 0x.org
      const url = this.props.baseURL + '/quote' + url_query;

      this.fetch_0x(url).then(async (res) => {
        if (res === 'err-liquidity') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Insufficient liquidity!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-limit') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              'Too many requests, please wait a second before making another request.',

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Rate limit!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-balance') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'Insufficient balance',

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Insufficient balance!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-allowance') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'Insufficient allowance',
            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Set allowance (' + this.state.pay_symbol + ')',
            button_state: 'ALLOWANCE',
          });

          return;
        }

        if (res === 'err-balance-allowance') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'Insufficient allownace',

            wallet_estimated_gas: '',

            // pay token

            // button
            button_text: 'Set allowance (' + this.state.pay_symbol + ')',
            button_state: 'ALLOWANCE',
          });

          return;
        }

        if (res === 'err-auth') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'One of the tokens is not authorized for trade',

            wallet_estimated_gas: '',

            // button
            button_text: 'Not Authorized',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-unknown') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'an unknown error occured',

            wallet_estimated_gas: '',

            // button
            button_text: 'Something went wrong',
            button_disabled: true,
          });

          return;
        }

        let sell_amount = Number(res.data.sellAmount);
        for (let i = 0; i < this.state.pay_decimals; i++) {
          sell_amount *= 0.1;
        }

        const state = {
          ...this.state,

          //common
          loading: false,
          error: '', // successfull quote from 0x means no liquidity errors as it includes both tokens

          wallet_estimated_gas: res.data.estimatedGas,

          // pay token
          pay_value: fhandle(sell_amount, 5),

          // receive token

          // button
          button_text: 'Swap',
          button_disabled: false,
        };

        if (!window.ethereum) {
          state.button_text = 'Install web3 wallet';
          state.button_disabled = true;

          this.setState(state);

          return;
        }

        if (!this.state.wallet_accounts[0]) {
          state.button_text = 'Connect wallet';
          state.button_disabled = false;

          this.setState(state);

          return;
        }

        const web3 = new Web3(window.ethereum);
        const chain_id = await web3.eth.getChainId();

        if (!this.CHAINS[Number(chain_id)]) {
          state.button_text = 'Unsupported chain';
          state.button_disabled = true;

          this.setState(state);

          return;
        }

        state.button_state = 'SWAP';

        this.setState(state);
      });
    }, this.TIMEOUT_MS);

    // update pay value input and loading
    this.setState({
      ...this.state,

      //common
      loading: true,
      error: '',

      // pay token
      pay_value: '',

      // receive token
      receive_value: value,
      receive_value_timeout: receive_value_timeout,

      // button
      button_disabled: false,
      button_text: 'Fetching',
    });
  }

  on_change_receive_search(e) {
    const value = e.target.value;

    clearTimeout(this.state.receive_search_timeout);

    const receive_search_timeout = setTimeout(async () => {
      const url_tokens =
        config.url_api +
        `/v1/tokens?search=${value}&chain_id=${this.state.wallet_chain_id}`;

      const res = await axios.get(url_tokens);

      this.setState({
        ...this.state,
        // common
        loading: false,

        // pay tokens
        receive_tokens: res.data,
      });
    }, this.TIMEOUT_MS); // TODO: make a global wait time for delayed api calls interval

    this.setState({
      ...this.state,
      // common
      loading: true,

      // pay token
      receive_search_timeout: receive_search_timeout,
      receive_search_value: value,
    });
  }

  on_click_receive_selector(current) {
    // USDC info on selected chain
    const usdc_address = this.CHAINS[this.state.wallet_chain_id].usdc_address;
    const usdc_decimals = this.CHAINS[this.state.wallet_chain_id].usdc_decimals;

    let sell_amount = '1'; // sell amount is static to get the price of selected token
    for (let i = 0; i < usdc_decimals; i++) {
      sell_amount += '0';
    }

    const url_query = `?buyToken=${current.address}&sellToken=${usdc_address}&sellAmount=${sell_amount}&chain_id=${this.state.wallet_chain_id}`;

    // final 0x.org url price
    const url_price = this.props.baseURL + '/price' + url_query;

    // Get selected tokens price data with 0x.org service async
    this.fetch_0x(url_price).then(async (res) => {
      // if usdc addresses are same, just go on by setting loading false,
      if (usdc_address.toLowerCase() === current.address.toLowerCase()) {
        this.setState({
          ...this.state,

          // common
          loading: false,

          // pay token
          receive_price: 1.0,

          // button
          //button_disabled: false,
        });

        return;
      }

      if (res === 'err-liquidity') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

          // pay token
          receive_price: 0,

          // button
          button_text: 'Insufficient liquidity!',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-limit') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            'Too many requests, please wait a second before making another request.',

          // pay token
          receive_price: 0,

          // button
          button_text: 'Rate limit!',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-auth') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error: 'One of the tokens is not authorized for trade',

          // receive token
          receive_price: 0.0,

          // button
          button_text: 'Not Authorized',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-unknown') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error: 'An unknown error occured',

          // receive token
          receive_price: 0.0,

          // button
          button_text: 'Something went wrong',
          button_disabled: true,
        });

        return;
      }

      let price = Number(res.data.buyAmount);
      for (let i = 0; i < current.decimals; i++) {
        price = price * 0.1;
      }

      price = 1.0 / price;

      const new_state = {
        ...this.state,

        // common
        loading: false,
        error: '',

        // pay token
        receive_price: Number(price),

        // button
        button_text: 'Enter an amount',
        button_disabled: true,
      };

      if (!window.ethereum) {
        new_state.button_text = 'Install web3 wallet';
        new_state.button_disabled = true;

        this.setState(new_state);

        return;
      }

      if (!this.state.wallet_accounts[0]) {
        new_state.button_text = 'Connect wallet';
        new_state.button_disabled = false;

        this.setState(new_state);

        return;
      }

      const web3 = new Web3(window.ethereum);
      const chain_id = await web3.eth.getChainId();

      if (!this.CHAINS[Number(chain_id)]) {
        new_state.button_text = 'Unsupported chain';
        new_state.button_disabled = true;

        this.setState(new_state);

        return;
      }

      this.setState(new_state);
    });

    if (current.address === this.state.pay_address) {
      this.setState({
        ...this.state,

        // common
        loading: true,
        error: '',

        // pay token
        pay_value: '',
        pay_address: this.state.receive_address,
        pay_img: this.state.receive_img,
        pay_symbol: this.state.receive_symbol,
        pay_name: this.state.receive_name,
        pay_decimals: this.state.receive_decimals,
        pay_chain_id: this.state.receive_chain_id,
        pay_price: this.state.receive_price,
        pay_balance: this.state.receive_balance,

        // receive token
        receive_value: '',
        receive_address: current.address,
        receive_img: current.img,
        receive_symbol: current.symbol,
        receive_name: current.name,
        receive_decimals: current.decimals,
        receive_chain_id: current.chain_id,
        receive_price: 0.0,
        receive_balance: 0.0,
        receive_selector_open: false,
        receive_search_value: '',
      });

      return;
    }

    this.setState({
      ...this.state,

      // common
      loading: true,
      error: '',

      // pay token
      pay_value: '',

      // receive token
      receive_value: '',
      receive_address: current.address,
      receive_img: current.img,
      receive_symbol: current.symbol,
      receive_name: current.name,
      receive_decimals: current.decimals,
      receive_chain_id: current.chain_id,
      receive_price: 0.0,
      receive_balance: 0.0,
      receive_selector_open: false,
      receive_search_value: '',
    });
  }

  on_replace_tokens(e) {
    e.preventDefault();

    if (this.state.loading) {
      return;
    }

    const state = {
      ...this.state,

      // common
      loading: true,
      error: '',

      // pay token params
      pay_value: this.state.receive_value,
      pay_value_timeout: 0,
      pay_address: this.state.receive_address,
      pay_img: this.state.receive_img,
      pay_symbol: this.state.receive_symbol,
      pay_name: this.state.receive_name,
      pay_decimals: this.state.receive_decimals,
      pay_price: this.state.receive_price,
      pay_balance: this.state.receive_balance,
      pay_chain_id: this.state.receive_chain_id,
      pay_selector_open: false,

      // receive token params
      receive_value: this.state.pay_value,
      receive_value_timeout: 0,
      receive_address: this.state.pay_address,
      receive_img: this.state.pay_img,
      receive_symbol: this.state.pay_symbol,
      receive_name: this.state.pay_name,
      receive_decimals: this.state.pay_decimals,
      receive_price: this.state.pay_price,
      receive_balance: this.state.pay_balance,
      receive_chain_id: this.state.pay_chain_id,
      receive_selector_open: false,
    };

    let sell_amount = Number(this.state.receive_value);
    let buy_amount = Number(this.state.pay_value);

    // buyToken & sellToken is reversed
    let url_query = `?buyToken=${this.state.pay_address}&sellToken=${this.state.receive_address}&chain_id=${this.state.wallet_chain_id}`;

    if (this.state.receive_value) {
      for (let i = 0; i < this.state.receive_decimals; i++) {
        sell_amount = sell_amount * 10;
      }

      if (sell_amount % 1 !== 0) {
        sell_amount = parseInt(sell_amount);
      }

      sell_amount = BigInt(sell_amount).toString();

      url_query += '&sellAmount=' + sell_amount;
    } else if (this.state.pay_value) {
      for (let i = 0; i < this.state.pay_decimals; i++) {
        buy_amount = buy_amount * 10;
      }

      if (buy_amount % 1 !== 0) {
        buy_amount = parseInt(buy_amount);
      }

      buy_amount = BigInt(buy_amount).toString();

      url_query += '&buyAmount=' + buy_amount;
    } else if (!sell_amount && !buy_amount) {
      state.loading = false;
      this.setState(state);

      return;
    }

    if (this.state.wallet_accounts[0]) {
      url_query = url_query + '&takerAddress=' + this.state.wallet_accounts[0];
    }

    const url_quote = this.props.baseURL + '/quote' + url_query;

    this.fetch_0x(url_quote).then(async (res) => {
      if (res === 'err-liquidity') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

          wallet_estimated_gas: '',

          // button
          button_text: 'Insufficient liquidity',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-balance') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            "You don't have enough " +
            this.state.pay_symbol +
            ' to make the trade.',

          wallet_estimated_gas: '',

          // pay token

          // button
          button_text: 'Insufficient balance!',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-allowance') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            "You don't have allowance for " +
            this.state.pay_symbol +
            '. Click to set allowance for ' +
            this.state.pay_symbol +
            ' token',

          wallet_estimated_gas: '',

          // pay token

          // button
          button_text: `Set allowance (${this.state.pay_symbol})`,
          button_state: 'ALLOWANCE',
          button_disabled: false,
        });

        return;
      }

      if (res === 'err-balance-allowance') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error:
            "You don't have allowance for " +
            this.state.pay_symbol +
            '. Click to set allowance for ' +
            this.state.pay_symbol +
            ' token',

          wallet_estimated_gas: '',

          // pay token

          // button
          button_text: `Set allowance (${this.state.pay_symbol})`,
          button_state: 'ALLOWANCE',
          button_disabled: false,
        });

        return;
      }

      if (res === 'err-auth') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error: 'One of the tokens is not authorized for trade',

          wallet_estimated_gas: '',

          // button
          button_text: 'Not Authorized',
          button_disabled: true,
        });

        return;
      }

      if (res === 'err-unknown') {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error: 'an unknown error occured',

          wallet_estimated_gas: '',

          // button
          button_text: 'Something went wrong',
          button_disabled: true,
        });

        return;
      }

      const state = {
        ...this.state,

        // common
        loading: false,
        error: '',

        wallet_estimated_gas: res.data.estimatedGas,
      };

      let res_sell_amount = Number(res.data.sellAmount);
      let res_buy_amount = Number(res.data.buyAmount);

      for (let i = 0; i < this.state.pay_decimals; i++) {
        res_sell_amount = res_sell_amount * 0.1;
      }

      for (let i = 0; i < this.state.receive_decimals; i++) {
        res_buy_amount = res_buy_amount * 0.1;
      }

      state.pay_value = fhandle(res_sell_amount, 5);
      state.receive_value = fhandle(res_buy_amount, 5);

      if (!window.ethereum) {
        state.button_text = 'Install web3 wallet';
        state.button_disabled = true;

        this.setState(state);

        return;
      }

      const web3 = new Web3(window.ethereum);
      const chain_id = await web3.eth.getChainId();

      if (!this.state.wallet_accounts[0]) {
        state.button_text = 'Connect wallet';

        this.setState(state);

        return;
      }

      if (!this.CHAINS[Number(chain_id)]) {
        state.button_text = 'Unsupported chain';
        state.button_disabled = true;

        this.setState(state);

        return;
      }

      state.button_text = 'Swap';
      state.button_disabled = false;
      state.button_state = 'SWAP';

      this.setState(state);
    });

    state.button_text = 'Fetching';

    this.setState(state);
  }

  async fetch_0x(url) {
    try {
      const res = await axios.get(url);
      return res;
    } catch (err) {
      if (
        err.response.data.message &&
        err.response.data.message.toLowerCase().includes('limit')
      ) {
        return 'err-limit';
      }

      if (
        err.response.data.validationErrors &&
        err.response.data.validationErrors[0] &&
        err.response.data.validationErrors[0].reason ===
          'INSUFFICIENT_ASSET_LIQUIDITY'
      ) {
        return 'err-liquidity';
      }

      if (
        err.response.data.values &&
        err.response.data.values.message &&
        err.response.data.values.message.toLowerCase().includes('balance')
      ) {
        return 'err-balance';
      }

      if (err.response.data.code === 109) {
        return 'err-balance';
      }

      if (
        err.response.data.values &&
        err.response.data.values.message &&
        err.response.data.values.message.toLowerCase().includes('allowance')
      ) {
        return 'err-allowance';
      }

      if (err.response.data.code === 111 || err.response.data.code === 105) {
        return 'err-balance-allowance';
      }

      if (
        err.response.data.validationErrors &&
        err.response.data.validationErrors[0] &&
        err.response.data.validationErrors[0].reason.includes('different')
      ) {
        // buyToken & sellToken must be different
        return 'err-same';
      }

      if (
        err.response.data.reason &&
        err.response.data.reason.includes('IZED_FOR_TRADE')
      ) {
        // BUY_TOKEN_NOT_AUTHORIZED_FOR_TRADE
        return 'err-auth';
      }

      return 'err-unknown';
    }
  }

  async on_click_button(e) {
    e.preventDefault();

    if (this.state.loading || this.state.button_disabled) {
      return;
    }

    if (!window.ethereum) {
      this.setState({
        ...this.state,

        // error
        loading: false,
        error: '',

        // button
        button_text: 'Install web3 wallet!',
        button_disabled: true,
      });

      return;
    }

    const web3 = new Web3(window.ethereum);

    let accounts = [];

    if (this.state.button_state === 'CONNECT') {
      this.setState({
        ...this.state,

        // common
        loading: true,

        // button
        button_text: 'Connecting',
      });

      accounts = await wallet_connect();

      if (!accounts) {
        this.setState({
          ...this.state,

          // common
          loading: false,

          // button
          button_text: 'Install web3 wallet',
          button_disable: true,
        });

        return;
      }

      //TODO: const sign = await web3.eth.personal.sign('signature!', accounts[0], '');

      const chain_id = await web3.eth.getChainId();

      if (!this.CHAINS[Number(chain_id)]) {
        this.setState({
          ...this.state,

          // common
          loading: false,
          error: '',

          // wallet
          wallet_accounts: accounts,
          // dont insert unsupported chain id into the state

          // button
          button_text: 'Unsupported chain',
          button_disabled: true,
        });

        return;
      }

      let button_text = 'Enter an amount';
      let button_disabled = true;
      if (this.state.pay_value && this.state.receive_value) {
        button_text = 'Swap';
        button_disabled = false;
      }

      // if connecting to the same chain like default eth 1
      if (Number(chain_id) === this.state.wallet_chain_id) {
        this.setState({
          ...this.state,
          // common
          loading: false,

          // wallet
          wallet_accounts: accounts,
          wallet_chain_id: Number(chain_id),

          // pay token
          //pay_tokens: res_tokens.data,

          // receive token
          //receive_tokens: res_tokens.data,

          // button
          button_text: button_text,
          button_state: 'SWAP',
          button_disabled: button_disabled,
        });

        return;
      }

      // if connecting to different chain
      const url_tokens =
        config.url_api + `/v1/tokens?chain_id=${Number(chain_id)}`;

      const res_tokens = await axios.get(url_tokens);

      const pay_token = res_tokens.data[0];
      const receive_token = res_tokens.data[1];

      // get prices of the new tokens from different chain
      const usdc_address = this.CHAINS[Number(chain_id)].usdc_address;
      const usdc_decimals = this.CHAINS[Number(chain_id)].usdc_decimals;
      let sell_amount = '1';
      for (let i = 0; i < usdc_decimals; i++) {
        sell_amount += '0';
      }

      const url_query_price_pay = `?buyToken=${
        pay_token.address
      }&sellToken=${usdc_address}&sellAmount=${sell_amount}&chain_id=${Number(
        chain_id
      )}`;

      const url_query_price_receive = `?buyToken=${
        receive_token.address
      }&sellToken=${usdc_address}&sellAmount=${sell_amount}&chain_id=${Number(
        chain_id
      )}`;

      // final 0x.org url price
      const url_price_pay = this.props.baseURL + '/price' + url_query_price_pay;

      const url_price_receive =
        this.props.baseURL + '/price' + url_query_price_receive;

      // Get selected tokens price data with 0x.org service async
      this.fetch_0x(url_price_pay).then(async (res) => {
        // if usdc addresses are same, just go on by setting loading false,
        if (usdc_address.toLowerCase() === pay_token.address.toLowerCase()) {
          this.setState({
            ...this.state,

            // common
            loading: false,

            // pay token
            pay_price: 1,

            // button
            //button_disabled: false,
          });

          return;
        }

        if (res === 'err-liquidity') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

            // pay token
            pay_price: 0,

            // button
            button_text: 'Insufficient liquidity!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-limit') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              'Too many requests, please wait a second before making another request.',

            // pay token
            pay_price: 0,

            // button
            button_text: 'Rate limit!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-auth') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'One of the tokens is not authorized for trade',

            // pay token
            pay_price: 0,

            // button
            button_text: 'Not Authorized',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-unknown') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'An unknown error occured',

            // pay token
            pay_price: 0,

            // button
            button_text: 'Something went wrong',
            button_disabled: true,
          });

          return;
        }

        let price = Number(res.data.buyAmount);
        for (let i = 0; i < pay_token.decimals; i++) {
          price = price * 0.1;
        }

        price = 1.0 / price;

        const new_state = {
          ...this.state,

          // common
          loading: false,
          error: '',

          // pay token
          pay_price: price,

          // button
          button_text: 'Enter an amount',
          button_disabled: true,
        };

        this.setState(new_state);
      });

      this.fetch_0x(url_price_receive).then(async (res) => {
        // if usdc addresses are same, just go on by setting loading false,
        if (
          usdc_address.toLowerCase() === receive_token.address.toLowerCase()
        ) {
          this.setState({
            ...this.state,

            // common
            loading: false,

            // pay token
            receive_price: 1.0,

            // button
            //button_disabled: false,
          });

          return;
        }

        if (res === 'err-liquidity') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

            // pay token
            receive_price: 0,

            // button
            button_text: 'Insufficient liquidity!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-limit') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              'Too many requests, please wait a second before making another request.',

            // pay token
            receive_price: 0,

            // button
            button_text: 'Rate limit!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-auth') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'One of the tokens is not authorized for trade',

            // receive token
            receive_price: 0,

            // button
            button_text: 'Not Authorized',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-unknown') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'An unknown error occured',

            // pay token
            receive_price: 0,

            // button

            button_text: 'Something went wrong',
            button_disabled: true,
          });

          return;
        }

        let price = Number(res.data.buyAmount);
        for (let i = 0; i < receive_token.decimals; i++) {
          price = price * 0.1;
        }

        price = 1.0 / price;

        const new_state = {
          ...this.state,

          // common
          loading: false,
          error: '',

          // pay token
          receive_price: price,

          // button
          button_text: 'Enter an amount',
          button_disabled: true,
        };

        this.setState(new_state);
      });

      this.setState({
        ...this.state,

        // common
        loading: false,

        // wallet
        wallet_accounts: accounts,
        wallet_chain_id: Number(chain_id),

        // pay token
        pay_value: '',
        pay_address: pay_token.address,
        pay_img: pay_token.img,
        pay_symbol: pay_token.symbol,
        pay_name: pay_token.name,
        pay_decimals: pay_token.decimals,
        pay_chain_id: pay_token.chain_id,
        pay_tokens: res_tokens.data,

        // receive token
        receive_value: '',
        receive_address: receive_token.address,
        receive_img: receive_token.img,
        receive_symbol: receive_token.symbol,
        receive_name: receive_token.name,
        receive_decimals: receive_token.decimals,
        receive_chain_id: receive_token.chain_id,
        receive_tokens: res_tokens.data,

        // button
        button_text: 'Enter an amount',
        button_state: 'SWAP',
        button_disabled: true,
      });

      // TODO Warning: global context dependency
      /**
       * 
       *       this.context.set_state({
        ...this.context.state,

        // wallet
        wallet_accounts: accounts,
        wallet_chain_id: Number(chain_id),
      });
       * 
      */
    }

    if (this.state.button_state === 'ALLOWANCE') {
      const state = { ...this.state, loading: true };

      this.setState(state);

      // prepare sell amount
      let sell_amount = Number(this.state.pay_value) || 1;
      for (let i = 0; i < this.state.pay_decimals; i++) {
        sell_amount = sell_amount * 10;
      }

      // BigInt throws error when value is a non-float
      if (sell_amount % 1 !== 0) {
        // TODO: we might want to do sell_amount.split(".")[0]
        sell_amount = parseInt(sell_amount);
      }

      sell_amount = BigInt(sell_amount).toString();

      const url_query = `?buyToken=${this.state.receive_address}&sellToken=${this.state.pay_address}&sellAmount=${sell_amount}&chain_id=${this.state.wallet_chain_id}`;
      const url = this.props.baseURL + '/quote' + url_query;
      const res_quote = await axios.get(url);

      const contract_pay = new web3.eth.Contract(
        this.ABI_ERC20,
        this.state.pay_address
      );

      const gas = await web3.eth.estimateGas({
        from: this.state.wallet_accounts[0],
      });

      try {
        await contract_pay.methods
          .approve(
            res_quote.data.allowanceTarget,
            '115792089237316200000000000000000000000000000000000000000000'
          )
          .send({ from: this.state.wallet_accounts[0], gas: gas });
      } catch (err) {
        state.loading = false;
        this.setState(state);

        return;
      }

      state.loading = false;
      state.error = '';

      state.pay_value = '';
      state.receive_value = '';

      state.button_state = 'SWAP';
      state.button_text = 'Enter an amount';

      this.setState(state);
    }

    if (this.state.button_state === 'SWAP') {
      this.setState({
        ...this.state,

        // common
        loading: true,

        // button
        button_text: 'Processing',
      });

      // prepare sell amount
      let sell_amount = Number(this.state.pay_value);
      for (let i = 0; i < this.state.pay_decimals; i++) {
        sell_amount = sell_amount * 10;
      }

      // BigInt throws error when value is a non-float
      if (sell_amount % 1 !== 0) {
        // TODO: we might want to do sell_amount.split(".")[0]
        sell_amount = parseInt(sell_amount);
      }

      sell_amount = BigInt(sell_amount).toString();

      // try with takerAddress to see errors
      const url_query_quote = `?buyToken=${this.state.receive_address}&sellToken=${this.state.pay_address}&sellAmount=${sell_amount}&chain_id=${this.state.wallet_chain_id}&takerAddress=${this.state.wallet_accounts[0]}`;

      const url_quote = this.props.baseURL + '/quote' + url_query_quote;
      let res_quote = null;

      /*
      // ALLOWANCE RESET //
      const url_query = `?buyToken=${this.state.receive_address}&sellToken=${this.state.pay_address}&sellAmount=${sell_amount}&chain_id=${this.state.wallet_chain_id}`;
      const url = this.props.baseURL + '/quote' + url_query;
      const res = await axios.get(url);
      const contract_pay = new web3.eth.Contract(
        this.ABI_ERC20,
        this.state.pay_address
      );
      const gas = await web3.eth.estimateGas({
        from: this.state.wallet_accounts[0],
      });
      await contract_pay.methods
        .approve(res.data.allowanceTarget, '0')
        .send({ from: this.state.wallet_accounts[0], gas: gas });
      // ALLOWANCE RESET //
      */

      let has_allowance = false; // for tokens that falls into 111 error code which we cannot fully understand if its allowance or insufficient balance, so we first set allowance statically then check again to see if its balance because we cannot get balances of the tokens in metamask

      let loop_count = 0; // limit loop count for unhandled errors that causes endless scenarios

      while (true) {
        res_quote = await this.fetch_0x(url_quote);

        if (res_quote.data) {
          break;
        }

        if (loop_count >= 6) {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'Unhandled error',

            // buttom
            button_text: 'Something went wrong',
            button_disabled: true,
          });

          return;
        }

        loop_count++;

        if (res_quote === 'err-balance') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: `You don't have enough ${this.state.pay_symbol} balance to make the trade`,

            // button
            button_text: 'Insufficient funds',
            button_disabled: true,
          });

          return;
        }

        const url_query_allowance = `?buyToken=${this.state.receive_address}&sellToken=${this.state.pay_address}&sellAmount=${sell_amount}&chain_id=${this.state.wallet_chain_id}`;
        const url_allowance =
          this.props.baseURL + '/quote' + url_query_allowance;

        const res_allowance = await axios.get(url_allowance);

        if (res_quote === 'err-allowance') {
          const contract_pay = new web3.eth.Contract(
            this.ABI_ERC20,
            this.state.pay_address
          );

          const gas = await web3.eth.estimateGas({
            from: this.state.wallet_accounts[0],
          });

          try {
            await contract_pay.methods
              .approve(
                res_allowance.data.allowanceTarget,
                '115792089237316200000000000000000000000000000000000000000000'
              )
              .send({ from: this.state.wallet_accounts[0], gas: gas });
          } catch (err_allowance) {
            this.setState({
              ...this.state,

              // common
              loading: false,
              error: '',

              // button
              button_text: 'Swap',
            });

            return;
          }
        }

        if (res_quote === 'err-balance-allowance') {
          // TODO: WETH err.response.data.code = 111 when it has no allowance or balance, if we have enough WETH balance it means it has no allowance, find a way to get token balances from wallet.

          // find pay_token balance
          // pay_balance < Number(this.state.pay_value)

          if (has_allowance) {
            this.setState({
              ...this.state,

              // common
              loading: false,
              error: `You don't have enough ${this.state.pay_symbol} balance to make the trade`,

              // button
              button_text: 'Insufficient funds',
              button_disabled: true,
            });

            return;
          }

          // if balance is more than the pay_value then it is an allowane error

          const contract_pay = new web3.eth.Contract(
            this.ABI_ERC20,
            this.state.pay_address
          );

          const gas = await web3.eth.estimateGas({
            from: this.state.wallet_accounts[0],
          });

          try {
            await contract_pay.methods
              .approve(
                res_allowance.data.allowanceTarget,
                '115792089237316200000000000000000000000000000000000000000000'
              )
              .send({ from: this.state.wallet_accounts[0], gas: gas });

            has_allowance = true;
          } catch (err_allowance) {
            this.setState({
              ...this.state,

              // common
              loading: false,
              error: '',

              // button
              button_text: 'Swap',
            });

            return;
          }
        }
      }

      const transaction = {
        from: this.state.wallet_accounts[0],
        to: res_quote.data.to,
        data: res_quote.data.data,
        value: res_quote.data.value,
        gasPrice: res_quote.data.gasPrice,
      };

      console.log(res_quote.data);

      // adding 20%-50% buffer to estimatedGas is recommended to avoid gas problems

      const gas_buffer = 1.35; // TODO: edit gas buffer

      res_quote.data.gas = parseInt(
        Number(res_quote.data.gas) * gas_buffer
      ).toString();

      res_quote.data.estimatedGas = parseInt(
        Number(res_quote.data.estimatedGas) * gas_buffer
      ).toString();

      web3.eth
        .sendTransaction(res_quote.data)
        .then((receipt) => {
          /*
          
                    this.context.set_state({
            ...this.context.state,

            ui_toasts: [
              ...this.context.state.ui_toasts,
              {
                message: 'Transaction successful',
                type: 'success',
                created_at: new Date(),
              },
            ],
          });*/

          this.setState({
            ...this.state,

            // common
            loading: false,

            wallet_estimated_gas: '',

            // pay token
            pay_value: '',

            // receive token
            receive_value: '',

            // button
            button_text: 'Enter an amount',
            button_disabled: true,
          });
        })
        .catch((err) => {
          const state = {
            ...this.state,

            // common
            loading: false,
            error: '',

            pay_value: '',

            receive_value: '',

            // button
            button_text: 'Enter an amount',
            button_disabled: true,
          };

          if (err.message.includes('denied')) {
            this.setState(state);

            return;
          }

          state.error = err.message;

          this.setState(state);
        });
    }
  }

  listen_wallet() {
    if (!window.ethereum) {
      return;
    }

    const web3 = new Web3(window.ethereum);

    web3.provider.on('message', () => {
      // ...
    });

    web3.provider.on('connect', () => {
      // ...
    });

    web3.provider.on('disconnect', () => {
      // ...
    });

    // Accounts changed
    web3.provider.on('accountsChanged', async () => {
      // ...

      const accounts = await web3.eth.getAccounts();

      if (!accounts[0]) {
        this.setState({
          ...this.state,

          // wallet
          wallet_accounts: accounts,
          wallet_chain_id: 1,

          // button
          button_text: 'Connect Wallet',
          button_disabled: false,
          button_state: 'CONNECT',
        });

        return;
      }

      this.setState({
        ...this.state,

        // wallet
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
        error: '',

        // button
        button_text: 'Chain Switch...',
        button_disabled: true,
      });

      // TODO: might do Promise.all for performance improvement
      const accounts = await web3.eth.getAccounts();

      // new chain
      const chain_id = await web3.eth.getChainId();

      if (!this.CHAINS[Number(chain_id)]) {
        this.setState({
          ...this.state,

          // common
          loading: false,

          // button
          button_text: 'Unsupported Chain',
          button_disabled: true,
        });

        return;
      }

      // new chain

      const url_tokens =
        config.url_api + `/v1/tokens?chain_id=${Number(chain_id)}`;
      const res_tokens = await axios.get(url_tokens);

      const pay_token = res_tokens.data[0];
      const receive_token = res_tokens.data[1];

      // USDC info on selected chain
      const usdc_address = this.CHAINS[Number(chain_id)].usdc_address;
      const usdc_decimals = this.CHAINS[Number(chain_id)].usdc_decimals;

      let sell_amount = '1'; // sell amount is static to get the price of selected token
      for (let i = 0; i < usdc_decimals; i++) {
        sell_amount += '0';
      }

      const url_query_pay = `?buyToken=${
        pay_token.address
      }&sellToken=${usdc_address}&sellAmount=${sell_amount}&chain_id=${Number(
        chain_id
      )}`;

      const url_price_pay = this.props.baseURL + '/price' + url_query_pay;

      const url_query_receive = `?buyToken=${
        receive_token.address
      }&sellToken=${usdc_address}&sellAmount=${sell_amount}&chain_id=${Number(
        chain_id
      )}`;

      const url_price_receive =
        this.props.baseURL + '/price' + url_query_receive;

      // final 0x.org url price for both pay and receive token asynchronously
      this.fetch_0x(url_price_pay).then(async (res) => {
        // if usdc addresses are same, just go on by setting loading false,
        if (usdc_address.toLowerCase() === pay_token.address.toLowerCase()) {
          this.setState({
            ...this.state,

            // common
            loading: false,

            // pay token
            pay_price: 1.0,

            // button
            //button_disabled: false,
          });

          return;
        }

        if (res === 'err-liquidity') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

            // pay token
            pay_price: 0.0,

            // button

            button_text: 'Insufficient liquidity!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-limit') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              'Too many requests, please wait a second before making another request.',

            // pay token
            pay_price: 0.0,

            // button

            button_text: 'Rate limit!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-auth') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'One of the tokens is not authorized for trade',

            // pay token
            pay_price: 0,

            // button
            button_text: 'Not Authorized',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-unknown') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'An unknown error occured',

            // pay token
            pay_price: 0,

            // button
            button_text: 'Something went wrong',
            button_disabled: true,
          });

          return;
        }

        let price = Number(res.data.buyAmount);
        for (let i = 0; i < pay_token.decimals; i++) {
          price = Number(price * 0.1);
        }

        price = 1.0 / price;

        const state = {
          ...this.state,

          // common
          loading: false,
          error: '',

          // pay token
          pay_price: price,

          // button
          button_text: 'Enter an amount',
          button_disabled: true,
        };

        if (!this.state.wallet_accounts[0]) {
          state.button_text = 'Connect Wallet';
          state.button_disabled = false;

          this.setState(state);

          return;
        }

        this.setState(state);
      });

      // delay receive tokens price fetch call

      this.fetch_0x(url_price_receive).then(async (res) => {
        // if usdc addresses are same, just go on by setting loading false,
        if (
          usdc_address.toLowerCase() === receive_token.address.toLowerCase()
        ) {
          this.setState({
            ...this.state,

            // common
            loading: false,

            // pay token
            receive_price: 1.0,

            // button
            //button_disabled: false,
          });

          return;
        }

        if (res === 'err-liquidity') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              "One of the tokens don't have enough asset on the network to make trade. This is common for very long-tail tokens.",

            // pay token
            receive_price: 0.0,

            // button

            button_text: 'Insufficient liquidity!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-limit') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error:
              'Too many requests, please wait a second before making another request.',

            // pay token
            receive_price: 0.0,

            // button

            button_text: 'Rate limit!',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-auth') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'One of the tokens is not authorized for trade',

            // receive token
            receive_price: 0,

            // button
            button_text: 'Not Authorized',
            button_disabled: true,
          });

          return;
        }

        if (res === 'err-unknown') {
          this.setState({
            ...this.state,

            // common
            loading: false,
            error: 'An unknown error occured',

            // receive token
            receive_price: 0,

            // button
            button_text: 'Something went wrong',
            button_disabled: true,
          });

          return;
        }

        let price = Number(res.data.buyAmount);
        for (let i = 0; i < receive_token.decimals; i++) {
          price = Number(price * 0.1);
        }

        price = 1.0 / price;

        const state = {
          ...this.state,

          // common
          loading: false,
          error: '',

          // pay token
          receive_price: price,

          // button
          button_text: 'Enter an amount',
          button_disabled: true,
        };

        if (!this.state.wallet_accounts[0]) {
          state.button_text = 'Connect Wallet';
          state.button_disabled = false;
          this.setState(state);

          return;
        }

        this.setState(state);
      });

      this.setState({
        ...this.state,

        // common
        loading: true,
        error: '',

        // wallet
        wallet_chain_id: Number(chain_id),

        // pay token
        pay_value: '',
        pay_address: pay_token.address,
        pay_img: pay_token.img,
        pay_symbol: pay_token.symbol,
        pay_name: pay_token.name,
        pay_decimals: pay_token.decimals,
        pay_chain_id: pay_token.chain_id,
        pay_price: 0,
        pay_tokens: res_tokens.data,

        // receive token
        receive_value: '',
        receive_address: receive_token.address,
        receive_img: receive_token.img,
        receive_symbol: receive_token.symbol,
        receive_name: receive_token.name,
        receive_decimals: receive_token.decimals,
        receive_chain_id: receive_token.chain_id,
        receive_price: 0,
        receive_tokens: res_tokens.data,

        // button
        //button_text: button_text,
        //button_disabled: button_disabled,
      });
    });
  }

  init() {
    // web3 wallet listen bindings
    this.listen_wallet();

    setTimeout(() => {
      this.on_click_pay_selector({
        address: this.state.pay_address,
        img: this.state.pay_img,
        symbol: this.state.pay_symbol,
        name: this.state.pay_name,
        decimals: this.state.pay_decimals,
        chain_id: this.state.pay_chain_id,
      });
    }, 1500);

    setTimeout(() => {
      this.on_click_receive_selector({
        address: this.state.receive_address,
        img: this.state.receive_img,
        symbol: this.state.receive_symbol,
        name: this.state.receive_name,
        decimals: this.state.receive_decimals,
        chain_id: this.state.receive_chain_id,
      });
    }, 1600);

    // place initial tokens from coingecko

    const url_tokens =
      config.url_api + `/v1/tokens?chain_id=${this.state.wallet_chain_id}`;

    setTimeout(() => {
      axios
        .get(url_tokens)
        .then((res) => {
          this.setState({
            ...this.state,

            // pay token
            pay_tokens: res.data,

            // receive token
            receive_tokens: res.data,
          });
        })
        .catch((err) => {});
    }, 1000);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div ref={this.ref_swap} className={cn(style['swap'])}>
        <div className={cn(style['swap-header'])}>
          <h2 className={cn(style['swap-header-title'])}>{this.props.title}</h2>

          <div
            onClick={this.on_click_settings}
            className={cn(style['swap-header-settings'])}
          >
            <Icon_settings />
          </div>
        </div>

        <div className={cn(style['swap-body'])}>
          {this.state.settings_open ? (
            <div className={cn(style['swap-body-settings'])}></div>
          ) : null}

          <div className={cn(style['swap-body-inputarea'])}>
            <label className={cn(style['swap-body-inputarea-label'])}>
              Pay
            </label>

            <div className={cn(style['swap-body-inputarea-body'])}>
              <input
                value={this.state.pay_value}
                onChange={(e) => this.on_change_pay_value(e)}
                type="text"
                placeholder="0"
              />

              <div
                className={cn(style['swap-body-inputarea-body-tokenselector'])}
                onClick={(e) => {
                  this.setState({
                    ...this.state,
                    pay_selector_open: !this.state.pay_selector_open,
                    receive_selector_open: false,
                  });
                }}
              >
                <Image
                  src={this.state.pay_img}
                  width="100"
                  height="100"
                  alt={this.state.pay_name}
                  className={cn(
                    style['swap-body-inputarea-body-tokenselector-img']
                  )}
                />

                <div
                  className={cn(
                    style['swap-body-inputarea-body-tokenselector-symbol']
                  )}
                >
                  {this.state.pay_symbol}
                </div>

                <div
                  className={cn(
                    style['swap-body-inputarea-body-tokenselector-icon']
                  )}
                >
                  <Icon_arrow_down />
                </div>
              </div>

              <div
                className={cn(
                  style['swap-body-inputarea-body-dropdown'],
                  this.state.pay_selector_open
                    ? style['swap-body-inputarea-body-dropdownactive']
                    : null
                )}
              >
                <div
                  className={cn(
                    style['swap-body-inputarea-body-dropdown-searcharea']
                  )}
                >
                  <div
                    className={cn(
                      style['swap-body-inputarea-body-dropdown-searcharea-ctr']
                    )}
                  >
                    <div
                      className={cn(
                        style[
                          'swap-body-inputarea-body-dropdown-searcharea-ctr-icon'
                        ]
                      )}
                    >
                      <Icon_search />
                    </div>

                    <input
                      value={this.state.pay_search_value}
                      onChange={(e) => this.on_change_pay_search(e)}
                      className={cn(
                        style[
                          'swap-body-inputarea-body-dropdown-searcharea-ctr-input'
                        ]
                      )}
                      placeholder="Search name or paste address..."
                    />
                  </div>
                </div>

                {this.state.pay_tokens.map((current, index) => {
                  return (
                    <div
                      key={index}
                      onClick={(e) => this.on_click_pay_selector(current)}
                      className={cn(
                        style['swap-body-inputarea-body-dropdown-item']
                      )}
                    >
                      <Image
                        src={current.img}
                        width="100"
                        height="100"
                        alt={current.name}
                        className={cn(
                          style['swap-body-inputarea-body-dropdown-item-img']
                        )}
                      />

                      <div
                        className={cn(
                          style['swap-body-inputarea-body-dropdown-item-right']
                        )}
                      >
                        <div
                          className={cn(
                            style[
                              'swap-body-inputarea-body-dropdown-item-right-name'
                            ]
                          )}
                        >
                          {current.name}
                        </div>

                        <div
                          className={cn(
                            style[
                              'swap-body-inputarea-body-dropdown-item-right-symbol'
                            ]
                          )}
                        >
                          {current.symbol}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={cn(style['swap-body-inputarea-info'])}>
              <div className={cn(style['swap-body-inputarea-info-usd'])}>
                {this.state.pay_value
                  ? '~$' + fhandle(this.state.pay_price * this.state.pay_value)
                  : null}
              </div>

              <div
                className={cn(style['swap-body-inputarea-info-token balance'])}
              >
                {
                  // 0.00 {this.state.pay_symbol} (Balance)
                }
              </div>
            </div>
          </div>

          <div className={cn(style['swap-body-replace'])}>
            <div
              onClick={(e) => this.on_replace_tokens(e)}
              className={cn(
                style['swap-body-replace-iconctr'],
                this.state.loading
                  ? style['swap-body-replace-iconctrdisabled']
                  : null
              )}
            >
              <Icon_swap
                className={cn(style['swap-body-replace-iconctr-icon'])}
              />
            </div>
          </div>

          <div className={cn(style['swap-body-inputarea'])}>
            <label className={cn(style['swap-body-inputarea-label'])}>
              Receive
            </label>

            <div className={cn(style['swap-body-inputarea-body'])}>
              <input
                value={this.state.receive_value}
                onChange={(e) => this.on_change_receive_value(e)}
                type="text"
                placeholder="0"
              />

              <div
                className={cn(style['swap-body-inputarea-body-tokenselector'])}
                onClick={(e) => {
                  this.setState({
                    ...this.state,
                    receive_selector_open: !this.state.receive_selector_open,
                    pay_selector_open: false,
                  });
                }}
              >
                <Image
                  src={this.state.receive_img}
                  width="100"
                  height="100"
                  alt={this.state.receive_name}
                  className={cn(
                    style['swap-body-inputarea-body-tokenselector-img']
                  )}
                />

                <div
                  className={cn(
                    style['swap-body-inputarea-body-tokenselector-symbol']
                  )}
                >
                  {this.state.receive_symbol}
                </div>

                <div
                  className={cn(
                    style['swap-body-inputarea-body-tokenselector-icon']
                  )}
                >
                  <Icon_arrow_down />
                </div>
              </div>

              <div
                className={cn(
                  style['swap-body-inputarea-body-dropdown'],
                  this.state.receive_selector_open
                    ? style['swap-body-inputarea-body-dropdownactive']
                    : null
                )}
              >
                <div
                  className={cn(
                    style['swap-body-inputarea-body-dropdown-searcharea']
                  )}
                >
                  <div
                    className={cn(
                      style['swap-body-inputarea-body-dropdown-searcharea-ctr']
                    )}
                  >
                    <div
                      className={cn(
                        style[
                          'swap-body-inputarea-body-dropdown-searcharea-ctr-icon'
                        ]
                      )}
                    >
                      <Icon_search />
                    </div>

                    <input
                      value={this.state.receive_search_value}
                      onChange={(e) => this.on_change_receive_search(e)}
                      className={cn(
                        style[
                          'swap-body-inputarea-body-dropdown-searcharea-ctr-input'
                        ]
                      )}
                      placeholder="Search name or paste address..."
                    />
                  </div>
                </div>

                {this.state.receive_tokens.map((current, index) => {
                  return (
                    <div
                      key={index}
                      onClick={(e) => this.on_click_receive_selector(current)}
                      className={cn(
                        style['swap-body-inputarea-body-dropdown-item']
                      )}
                    >
                      <Image
                        src={current.img}
                        width="100"
                        height="100"
                        alt={current.name}
                        className={cn(
                          style['swap-body-inputarea-body-dropdown-item-img']
                        )}
                      />

                      <div
                        className={cn(
                          style['swap-body-inputarea-body-dropdown-item-right']
                        )}
                      >
                        <div
                          className={cn(
                            style[
                              'swap-body-inputarea-body-dropdown-item-right-name'
                            ]
                          )}
                        >
                          {current.name}
                        </div>

                        <div
                          className={cn(
                            style[
                              'swap-body-inputarea-body-dropdown-item-right-symbol'
                            ]
                          )}
                        >
                          {current.symbol}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={cn(style['swap-body-inputarea-info'])}>
              <div className={cn(style['swap-body-inputarea-info-usd'])}>
                {this.state.receive_value
                  ? '~$' +
                    fhandle(this.state.receive_price * this.state.receive_value)
                  : null}
              </div>

              <div
                className={cn(style['swap-body-inputarea-info-token balance'])}
              >
                {
                  ///0.00 {this.state.receive_symbol} (Balance)
                }
              </div>
            </div>
          </div>

          <button
            onClick={(e) => this.on_click_button(e)}
            className={cn(
              style['swap-body-button'],
              this.state.loading || this.state.button_disabled
                ? style['swap-body-buttondisabled']
                : null
            )}
          >
            {this.state.loading ? (
              <div className={cn(style['swap-body-button-loading'])}>
                <Icon_loading />
              </div>
            ) : null}

            {this.state.button_text}
          </button>

          {this.state.error ? (
            <div className={cn(style['swap-body-error'])}>
              {this.state.error}
            </div>
          ) : (
            <div className={cn(style['swap-body-details'])}>
              <div className={cn(style['swap-body-details-item'])}>
                <div className={cn(style['swap-body-details-item-key'])}>
                  Estimated Gas:
                </div>

                <div className={cn(style['swap-body-details-item-value'])}>
                  {this.state.wallet_estimated_gas}
                </div>
              </div>

              <div className={cn(style['swap-body-details-item'])}>
                <div className={cn(style['swap-body-details-item-key'])}>
                  Slippage:
                </div>

                <div className={cn(style['swap-body-details-item-value'])}>
                  {this.state.settings_slippage * 100}%
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// Component parameters
Swap.defaultProps = {
  title: 'Swap', // Title on the top left
  baseURL: config.url_api + '/v1/swap', // we keep the base url open ended incase developers wants to implement 0x.org API on their back end, for implementing your own 0x.org API check the docs: https://docs.panpa.dev
};

export default Swap;
