// MODULES
import Web3 from 'web3';
import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import cn from 'classnames';

// COMPONENTS
import Icon_button from '../icons/button';
import Icon_pointer from '../icons/pointer';
import Icon_keyboard_arrow_down from '../icons/keyboard_arrow_down';
import Icon_loading from '../icons/loading';

// CONFIG
import config from '../../config';

// CONTEXT
import { Context } from '../../context';

// UTILS
import { sleep, wallet_connect } from '../../utils/index.js';
import UTILS_API from '../../utils/api.js';

// STYLES
import style from './style.module.css';

class Seedsale extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading_receive: true,
      error: '',

      // seed sale settings
      start_time: new Date(new Date().valueOf() + 10000),
      end_time: new Date(new Date().valueOf() + 30000),
      contributers: 0,
      total_amount: 18468469, // total token amount to be sold
      total_sold: 0, // total token sold
      total_buy: 0,
      min_buy: 0.01, // in native coin e.g. ETH
      max_buy: 0.1, // in native coin e.g. ETH

      token_address: '0xC002aead3C5A93449b05615786F4a454764EF4F1',
      token_chain_id: 11155111,
      token_decimals: 18,
      token_supply: 369369369,
      token_price: 0.000333, // seed sale price
      token_name: 'Panpa',
      token_symbol: 'PANPA',
      token_img: '/favicon.ico',
      token_abi: [
        {
          inputs: [
            {
              internalType: 'string',
              name: 'name_',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'symbol_',
              type: 'string',
            },
            {
              internalType: 'uint8',
              name: 'decimals_',
              type: 'uint8',
            },
            {
              internalType: 'uint256',
              name: 'totalSupply_',
              type: 'uint256',
            },
            {
              internalType: 'address',
              name: 'serviceFeeReceiver_',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'serviceFee_',
              type: 'uint256',
            },
          ],
          stateMutability: 'payable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
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
              internalType: 'address',
              name: 'previousOwner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'OwnershipTransferred',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'token',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'enum TokenType',
              name: 'tokenType',
              type: 'uint8',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'version',
              type: 'uint256',
            },
          ],
          name: 'TokenCreated',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
        {
          inputs: [],
          name: 'VERSION',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
          ],
          name: 'allowance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'decimals',
          outputs: [
            {
              internalType: 'uint8',
              name: '',
              type: 'uint8',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'subtractedValue',
              type: 'uint256',
            },
          ],
          name: 'decreaseAllowance',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'addedValue',
              type: 'uint256',
            },
          ],
          name: 'increaseAllowance',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'owner',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'renounceOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256',
            },
          ],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transfer',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'newOwner',
              type: 'address',
            },
          ],
          name: 'transferOwnership',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      token_bytecode: '',

      wallet_accounts: [],
      wallet_chain_id: 1,
      wallet_sale_address: '0x5274048990DD4cf7B1207deF71f53dFfAAe9bbdf', // seed sale wallet address

      pay_value: 0.01,
      receive_value: '',
      receive_timeout_id: 0,

      button_text: 'Connect wallet',
      button_disabled: false,
      button_job: 'CONNECT',

      // ui
      ui_knob_cursor_mouse_down: false,
    };

    // constants
    this.CHAINS = {
      [this.state.token_chain_id]:
        config.blockchain_chains[this.state.token_chain_id],
    };
    this.MIN_BUY = this.state.min_buy;
    this.MAX_BUY = this.state.max_buy;
    this.API_KEY_MORALIS =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVlZmI2ZmJmLTljZGItNGQ5NS1iNzlkLTA3Yjc0ZDRiZTQ3OSIsIm9yZ0lkIjoiMzgyNjA4IiwidXNlcklkIjoiMzkzMTM0IiwidHlwZUlkIjoiOTU4OGZjNmUtZmQ4MC00YTQ0LWE5MTMtNDIyNjRjOGY3OWEwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTAzMjk5NjQsImV4cCI6NDg2NjA4OTk2NH0.4T3eih5-iG2su_oLd6nOQazZq5N9FyL5QjgkgpjpGI8';

    // functions
    this.update_time = this.update_time.bind(this);
    this.update_balance = this.update_balance.bind(this);
    this.on_mouse_move_knob = this.on_mouse_move_knob.bind(this);
    this.on_change_input = this.on_change_input.bind(this);
    this.listen_wallet = this.listen_wallet.bind(this);
    this.configure_remaining_buy = this.configure_remaining_buy.bind(this);
    this.get_contributers_count = this.get_contributers_count.bind(this);
    this.fetch_receive = this.fetch_receive.bind(this);
    this.init = this.init.bind(this);

    this.__fulfill_transactions = this.__fulfill_transactions.bind(this);

    // refs
    this.ref_countdown_title = React.createRef();
    this.ref_days = React.createRef();
    this.ref_hours = React.createRef();
    this.ref_minutes = React.createRef();
    this.ref_seconds = React.createRef();
    this.ref_progress = React.createRef(); // txn bar
    this.ref_knob = React.createRef();
    this.ref_knob_cursor = React.createRef();
  }

  async __fulfill_transactions() {
    if (!window.ethereum) {
      return;
    }

    const web3 = new Web3(window.ethereum);
    const accounts = await wallet_connect();

    // transactions from mongodb
    const res_seed_sales_get = await axios.get(
      config.url_api + '/v1/seed-sales'
    );

    // validate & filter transaction objects first
    for (let i = 0; i < res_seed_sales_get.data.length; i++) {
      for (let j = 0; j < res_seed_sales_get.data.length; j++) {
        if (
          res_seed_sales_get.data[i].hash.toLowerCase() ===
            res_seed_sales_get.data[j].hash.toLowerCase() &&
          res_seed_sales_get.data[i].created_at.valueOf() <
            res_seed_sales_get.data[j].created_at.valueOf()
        ) {
          res_seed_sales_get.data[j].illegal = true;
        }
      }
    }

    const transactions = [];

    for (let i = 0; i < res_seed_sales_get.data.length; i++) {
      if (res_seed_sales_get.data[i].fulfilled) {
        continue;
      }

      if (res_seed_sales_get.data[i].illegal) {
        continue;
      }

      let res_hash = null;
      try {
        res_hash = await axios.get(
          'https://deep-index.moralis.io/api/v2.2/transaction/' +
            res_seed_sales_get.data[i].hash +
            '?chain=' +
            web3.utils.toHex(this.state.token_chain_id).toString(),
          {
            headers: {
              'x-api-key': this.API_KEY_MORALIS,
            },
          }
        );
      } catch (err) {
        continue;
      }

      if (!Number(res_hash.data.value)) {
        continue;
      }

      if (
        new Date(res_hash.data.block_timestamp).valueOf() <
          this.state.start_time.valueOf() ||
        new Date(res_hash.data.block_timestamp).valueOf() >
          this.state.end_time.valueOf() + 180000
      ) {
        //continue;
      }

      if (
        res_hash.data.to_address.toLowerCase() !==
        this.state.wallet_sale_address.toLowerCase()
      ) {
        continue;
      }

      transactions.push(res_seed_sales_get.data[i]);
    }

    // send panpa tokens to investors one by one with metamask
    for (let i = 0; i < transactions.length; i++) {
      const res_hash = await axios.get(
        'https://deep-index.moralis.io/api/v2.2/transaction/' +
          transactions[i].hash +
          '?chain=' +
          web3.utils.toHex(this.state.token_chain_id).toString(),
        {
          headers: {
            'x-api-key': this.API_KEY_MORALIS,
          },
        }
      );

      // PANPA token transaction area
      // this.CHAINS[this.state.token_chain_id]
      const usdc_address = config.blockchain_chains[1].usdc_address;
      const usdc_decimals = config.blockchain_chains[1].usdc_decimals;

      // native currency of the current chain
      const coin_address = config.blockchain_chains[1].token_address;
      const coin_decimals = config.blockchain_chains[1].token_decimals;

      let sell_amount = '1';
      for (let i = 0; i < usdc_decimals; i++) {
        sell_amount += '0';
      }

      const url_price_query = `?sellToken=${usdc_address}&buyToken=${coin_address}&sellAmount=${sell_amount}&chain_id=${1}`;
      const url_price = config.url_api + '/v1/swap/price' + url_price_query;

      const res_price = await axios.get(url_price);

      let coin_price = Number(res_price.data.buyAmount);
      for (let i = 0; i < coin_decimals; i++) {
        coin_price *= 0.1;
      }

      coin_price = 1 / coin_price;

      // Native coin amount that investors sent us
      let coin_amount = Number(res_hash.data.value);
      for (let i = 0; i < coin_decimals; i++) {
        coin_amount *= 0.1;
      }

      let sale_token_amount =
        (coin_amount * coin_price) / this.state.token_price;

      for (let i = 0; i < this.state.token_decimals; i++) {
        sale_token_amount *= 10;
      }

      console.log(
        'Token amount to send back: ',
        BigInt(sale_token_amount).toString()
      );

      let gas = await web3.eth.estimateGas({
        from: accounts[0],
      });

      gas = parseInt(Number(gas) * 1.2).toString();

      const contract = new web3.eth.Contract(
        this.state.token_abi,
        this.state.token_address,
        { from: accounts[0], gas: gas }
      );

      const res = await contract.methods
        .transfer(
          res_hash.data.from_address,
          BigInt(sale_token_amount).toString()
        )
        .send();

      console.log('transfer(): ', res.transactionHash);

      const res_seed_sales_edit = await axios.put(
        config.url_api + '/v1/seed-sales',
        {
          _id: transactions[i]._id,
          fulfilled: true,
        },
        {
          headers: {
            key: '9f7aee70e748739a4b2a0040fa26e46d34f8b4877e4c9e7ec6368730ab8e74c3',
          },
        }
      );

      console.log('res_seed_sales_edit: ', res_seed_sales_edit.data);
    }
  }

  update_time(interval_id) {
    const now = new Date().valueOf();
    let delta_time = 0;

    if (now > this.state.end_time.valueOf()) {
      this.ref_countdown_title.current.innerHTML = 'SEED SALE HAS ENDED';

      this.ref_days.current.innerHTML = '00';
      this.ref_hours.current.innerHTML = '00';
      this.ref_minutes.current.innerHTML = '00';
      this.ref_seconds.current.innerHTML = '00';

      clearInterval(interval_id);

      return;
    }

    if (now < this.state.start_time.valueOf()) {
      this.ref_countdown_title.current.innerHTML = 'SEED SALE STARTS IN';
      delta_time = this.state.start_time.valueOf() - now;
    }

    if (
      now > this.state.start_time.valueOf() &&
      now < this.state.end_time.valueOf()
    ) {
      this.ref_countdown_title.current.innerHTML = 'SEED SALE ENDS IN';
      delta_time = this.state.end_time.valueOf() - now;
    }

    const seconds = delta_time / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    const leftover_hours = (days % 1) * 24;
    const leftover_minutes = (leftover_hours % 1) * 60;
    const leftover_seconds = (leftover_minutes % 1) * 60;

    let remaining_days = parseInt(days);
    let remaining_hours = parseInt(leftover_hours);
    let remaining_minutes = parseInt(leftover_minutes);
    let remaining_seconds = parseInt(leftover_seconds);

    if (days < 10) {
      remaining_days = '0' + remaining_days;
    }

    if (leftover_hours < 10) {
      remaining_hours = '0' + remaining_hours;
    }

    if (leftover_minutes < 10) {
      remaining_minutes = '0' + remaining_minutes;
    }

    if (leftover_seconds < 10) {
      remaining_seconds = '0' + remaining_seconds;
    }

    this.ref_days.current.innerHTML = remaining_days;
    this.ref_hours.current.innerHTML = remaining_hours;
    this.ref_minutes.current.innerHTML = remaining_minutes;
    this.ref_seconds.current.innerHTML = remaining_seconds;
  }

  // fetches the remaining seed sale token in the seed sale wallet address then calculates the total tokens sold in the seed sale
  async update_balance(interval_id) {
    if (!window.ethereum) {
      clearInterval(interval_id);

      return;
    }

    const web3 = new Web3(window.ethereum);
    const chain_id = await web3.eth.getChainId();

    if (!this.CHAINS[Number(chain_id)]) {
      return;
    }

    const contract = new web3.eth.Contract(
      this.state.token_abi,
      this.state.token_address
    );

    let balance = await contract.methods
      .balanceOf(this.state.wallet_sale_address)
      .call();

    balance = Number(balance);
    for (let i = 0; i < this.state.token_decimals; i++) {
      balance = balance * 0.1;
    }

    const progress =
      (this.state.total_amount - balance) / this.state.total_amount;

    this.ref_progress.current.style.width = 100 * progress + '%';

    const contributers_count = await this.get_contributers_count();

    this.setState({
      ...this.state,

      error: '',

      contributers: contributers_count,
      total_sold: parseInt(this.state.total_amount - balance),
    });
  }

  on_mouse_move_knob(e, type) {
    if (!this.state.ui_knob_cursor_mouse_down && type !== 'CLICK') {
      return;
    }

    const knob_rect = this.ref_knob.current.getBoundingClientRect();
    const knob_cursor = this.ref_knob_cursor.current;

    const x = e.clientX - knob_rect.x;
    const magnet_offset = 10;
    const fixed = 4;
    const state = { ...this.state };

    if (
      x < 0 ||
      x >= knob_rect.width ||
      this.state.max_buy <= this.state.min_buy
    ) {
      return;
    }

    state.loading_receive = true;

    clearTimeout(this.state.receive_timeout_id);

    if (Math.abs(knob_rect.width * 0.25 - x) <= magnet_offset) {
      knob_cursor.style.left = knob_rect.width * 0.25 + 'px';

      state.pay_value = Number(
        (
          (this.state.max_buy - this.state.min_buy) * 0.25 +
          this.state.min_buy
        ).toFixed(fixed)
      );

      const receive_timeout_id = setTimeout(() => {
        this.fetch_receive(this.state.pay_value);
      }, 1000);

      state.receive_timeout_id = receive_timeout_id;

      this.setState(state);

      return;
    }

    if (Math.abs(knob_rect.width * 0.5 - x) <= magnet_offset) {
      knob_cursor.style.left = knob_rect.width * 0.5 + 'px';
      state.pay_value = Number(
        (
          (this.state.max_buy - this.state.min_buy) * 0.5 +
          this.state.min_buy
        ).toFixed(fixed)
      );

      const receive_timeout_id = setTimeout(() => {
        this.fetch_receive(this.state.pay_value);
      }, 1000);

      state.receive_timeout_id = receive_timeout_id;

      this.setState(state);

      return;
    }

    if (Math.abs(knob_rect.width * 0.75 - x) <= magnet_offset) {
      knob_cursor.style.left = knob_rect.width * 0.75 + 'px';
      state.pay_value = Number(
        (
          (this.state.max_buy - this.state.min_buy) * 0.75 +
          this.state.min_buy
        ).toFixed(fixed)
      );

      const receive_timeout_id = setTimeout(() => {
        this.fetch_receive(this.state.pay_value);
      }, 1000);

      state.receive_timeout_id = receive_timeout_id;

      this.setState(state);

      return;
    }

    if (Math.abs(knob_rect.width - x) <= magnet_offset) {
      knob_cursor.style.left = knob_rect.width + 'px';
      state.pay_value = this.state.max_buy;

      const receive_timeout_id = setTimeout(() => {
        this.fetch_receive(this.state.pay_value);
      }, 1000);

      state.receive_timeout_id = receive_timeout_id;

      this.setState(state);

      return;
    }

    knob_cursor.style.left = x + 'px';
    state.pay_value = Number(
      (
        (x / knob_rect.width) * (this.state.max_buy - this.state.min_buy) +
        this.state.min_buy
      ).toFixed(fixed)
    );

    const receive_timeout_id = setTimeout(() => {
      this.fetch_receive(this.state.pay_value);
    }, 1000);

    state.receive_timeout_id = receive_timeout_id;

    this.setState(state);
  }

  on_change_input(e) {
    const knob_cursor = this.ref_knob_cursor.current;
    const value = e.target.value;

    if (isNaN(Number(value))) {
      return;
    }

    if (this.state.max_buy <= this.state.min_buy) {
      return;
    }

    if (value.length > 6) {
      return;
    }

    const state = {
      ...this.state,

      loading_receive: true,
    };

    clearTimeout(this.state.receive_timeout_id);

    if (Number(value) > this.state.max_buy) {
      knob_cursor.style.left = '100%';

      const receive_timeout_id = setTimeout(() => {
        this.fetch_receive(this.state.max_buy);
      }, 1000);

      state.pay_value = this.state.max_buy;
      state.receive_timeout_id = receive_timeout_id;

      this.setState(state);

      return;
    }

    if (Number(value) < this.state.min_buy) {
      knob_cursor.style.left = '0%';
      state.pay_value = value;

      state.loading_receive = false;

      state.receive_value = '0';

      this.setState(state);

      return;
    }

    knob_cursor.style.left =
      ((Number(value) - this.state.min_buy) /
        (this.state.max_buy - this.state.min_buy)) *
        100 +
      '%';

    const receive_timeout_id = setTimeout(() => {
      this.fetch_receive(value);
    }, 1000);

    state.pay_value = value;
    state.receive_timeout_id = receive_timeout_id;

    this.setState(state);
  }

  async on_click_button(e) {
    e.preventDefault();

    if (this.state.loading || this.state.button_disabled) {
      return;
    }

    const web3 = new Web3(window.ethereum);

    if (this.state.button_job === 'CONNECT') {
      const state = {
        ...this.state,

        loading: true,
        button_text: 'Connecting',
      };

      this.setState(state);

      const accounts = await wallet_connect();

      state.loading = false;
      state.error = '';

      if (!accounts[0]) {
        state.button_text = 'Connect wallet';
        state.button_disabled = false;

        this.setState(state);

        return;
      }

      state.wallet_accounts = accounts;

      const chain_id = await web3.eth.getChainId();

      if (!this.CHAINS[Number(chain_id)]) {
        const token_chain_name = this.CHAINS[this.state.token_chain_id].name;

        //this.ref_progress.current.style.width = '0%';
        state.loading_receive = false;
        state.error =
          'Please switch to ' +
          token_chain_name +
          ' to participate in the seed sale';

        state.wallet_chain_id = Number(chain_id);

        state.button_text = 'Switch to ' + token_chain_name;
        state.button_disabled = false;
        state.button_job = 'SWITCH';

        this.setState(state);

        return;
      }

      state.loading_receive = true;

      this.configure_remaining_buy(accounts[0], state);

      return;
    }

    if (this.state.button_job === 'SWITCH') {
      const state = {
        ...this.state,

        // common
        loading: true,

        // button
        button_text: 'Switching',
      };

      this.setState(state);

      try {
        // no need to change state after wallet connect because switching chain triggers chainChanged event on web3.provider.on
        await wallet_connect(this.state.token_chain_id);
      } catch (err) {
        const token_chain_name = this.CHAINS[this.state.token_chain_id].name;

        if (err.message && err.message.includes('reject')) {
          this.setState({
            ...this.state,

            // common
            loading: false,

            button_text: 'Switch to ' + token_chain_name,
            button_disabled: false,
            button_job: 'SWITCH',
          });

          return;
        }
      }

      return;
    }

    if (this.state.button_job === 'BUY') {
      const state = { ...this.state };
      const now = new Date().valueOf();

      if (now < this.state.start_time.valueOf()) {
        this.context.set_state({
          ...this.context.state,

          ui_toasts: [
            ...this.context.state.ui_toasts,
            {
              message: "Seed sale hasn't started yet",
              type: 'error',
              created_at: new Date(),
            },
          ],
        });

        return;
      }

      if (now > this.state.end_time.valueOf()) {
        this.context.set_state({
          ...this.context.state,

          ui_toasts: [
            ...this.context.state.ui_toasts,
            {
              message: 'Seed sale has ended',
              type: 'error',
              created_at: new Date(),
            },
          ],
        });

        return;
      }

      if (this.state.max_buy === 0) {
        this.context.set_state({
          ...this.context.state,

          ui_toasts: [
            ...this.context.state.ui_toasts,
            {
              message: 'You have reached your purchase limit',
              type: 'info',
              created_at: new Date(),
            },
          ],
        });

        return;
      }

      if (Number(this.state.pay_value) < this.MIN_BUY) {
        this.context.set_state({
          ...this.context.state,

          ui_toasts: [
            ...this.context.state.ui_toasts,
            {
              message:
                'Minimum buy is ' +
                this.MIN_BUY +
                ' ' +
                this.CHAINS[this.state.token_chain_id].token_symbol,
              type: 'info',
              created_at: new Date(),
            },
          ],
        });

        return;
      }

      state.loading = true;
      state.button_text = 'Processing';

      this.setState(state);

      const res_captcha = await hcaptcha.execute('', { async: true });

      let pay_value = Number(this.state.pay_value);
      const coin_decimals =
        this.CHAINS[this.state.token_chain_id].token_decimals;
      for (let i = 0; i < coin_decimals; i++) {
        pay_value *= 10;
      }

      pay_value = BigInt(pay_value).toString();

      const gas_price = await web3.eth.getGasPrice();
      let gas = await web3.eth.estimateGas({
        from: this.state.wallet_accounts[0],
      });

      const gas_buffer = 1.2;
      gas = parseInt(Number(gas) * gas_buffer).toString();

      const txn = {
        from: this.state.wallet_accounts[0],
        to: this.state.wallet_sale_address,
        value: pay_value,
        gas: gas,
        gasPrice: gas_price,
      };

      let receipt = null;
      try {
        receipt = await web3.eth.sendTransaction(txn);
      } catch (err) {
        console.log(err);

        state.loading = false;
        state.button_text = 'Buy ' + this.state.token_symbol;

        if (err.message && err.message.includes('denied')) {
          state.button_text = 'Buy PANPA';

          this.setState(state);

          return;
        }

        if (err.message && err.message.includes('funds')) {
          this.context.set_state({
            ...this.context.state,

            ui_toasts: [
              ...this.context.state.ui_toasts,
              {
                message: 'Insufficient funds for transaction',
                type: 'error',
                created_at: new Date(),
              },
            ],
          });

          this.setState(state);

          return;
        }

        return;
      }

      const res_seed_sales_create = await axios.post(
        config.url_api + '/v1/seed-sales',
        {
          from: this.state.wallet_accounts[0],
          hash: receipt.transactionHash,
          value: txn.value,
          captcha_token: res_captcha.response,
        }
      );

      state.loading = false;

      this.context.set_state({
        ...this.context.state,

        ui_toasts: [
          ...this.context.state.ui_toasts,
          {
            message: 'You have successfully made the purchase',
            type: 'success',
            created_at: new Date(),
          },
          {
            message: 'The PANPAS will arrive into your wallet in 10 - 15 mins',
            type: 'info',
            created_at: new Date(),
          },
        ],
      });

      this.configure_remaining_buy(this.state.wallet_accounts[0], state);

      return;
    }
  }

  async listen_wallet() {
    if (!window.ethereum) {
      this.setState({
        ...this.state,

        error: 'Please install web3 wallet to participate in the seed sale',

        button_text: 'Install web3 wallet',
        button_disabled: true,
      });

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

      const state = { ...this.state, loading: false };

      const accounts = await web3.eth.getAccounts();
      const chain_id = await web3.eth.getChainId();

      if (!accounts[0]) {
        state.wallet_accounts = [];
        state.wallet_chain_id = 1;

        state.button_text = 'Connect wallet';
        state.button_disabled = false;
        state.button_job = 'CONNECT';

        this.setState(state);

        return;
      }

      state.wallet_accounts = accounts;

      if (!this.CHAINS[Number(chain_id)]) {
        const chain_name = this.CHAINS[this.state.token_chain_id].name;

        //this.ref_progress.current.style.width = '0%';

        state.wallet_chain_id = Number(chain_id);

        state.button_text = 'Switch to ' + chain_name;
        state.button_disabled = false;
        state.button_job = 'SWITCH';

        if (!this.state.wallet_accounts[0]) {
          state.button_text = 'Connect wallet';
          state.button_job = 'CONNECT';
        }

        this.setState(state);

        return;
      }

      this.configure_remaining_buy(accounts[0], state);
    });

    // Chain changed
    web3.provider.on('chainChanged', async () => {
      // ...

      const chain_id = await web3.eth.getChainId();

      if (!this.CHAINS[Number(chain_id)]) {
        const chain_name = this.CHAINS[this.state.token_chain_id].name;

        // this.ref_progress.current.style.width = '0%';

        const state = {
          ...this.state,

          error:
            'Please switch to ' +
            chain_name +
            ' to participate in the seed sale',

          wallet_chain_id: Number(chain_id),

          button_text: 'Switch to ' + chain_name,
          button_disabled: false,
          button_job: 'SWITCH',
        };

        if (!this.state.wallet_accounts[0]) {
          state.button_text = 'Connect wallet';
          state.button_job = 'CONNECT';
        }

        this.setState(state);

        return;
      }

      this.update_balance(0);

      const state = {
        ...this.state,

        // common
        loading: false,
        loading_receive: true,

        wallet_chain_id: Number(chain_id),

        // button
        button_text: 'Connect wallet',
        button_disabled: false,
        button_job: 'CONNECT',
      };

      if (this.state.wallet_accounts[0]) {
        state.button_text = 'Buy ' + this.state.token_symbol;
        state.button_job = 'BUY';
      }

      this.configure_remaining_buy(this.state.wallet_accounts[0], state);
    });

    const chain_id = await web3.eth.getChainId();

    const state = {
      ...this.state,

      wallet_chain_id: Number(chain_id),
    };

    if (this.state.token_chain_id !== Number(chain_id)) {
      const token_chain_name = this.CHAINS[this.state.token_chain_id].name;

      state.error =
        'Please switch to ' +
        token_chain_name +
        ' to participate in the seed sale';
    }

    this.setState(state);
  }

  // calculates how many seed sale tokens user will get at the end of transaction with given native coin amount (e.g. ETH)
  async fetch_receive(pay_value) {
    // TODO: replace CHAINS with dynamic token state
    const coin_address = config.blockchain_chains[1].token_address;
    const coin_decimals = config.blockchain_chains[1].token_decimals;

    const usdc_address = config.blockchain_chains[1].usdc_address;
    const usdc_decimals = config.blockchain_chains[1].usdc_decimals;

    //const coin_address = this.CHAINS[this.state.token_chain_id].token_address;
    //const coin_decimals = this.CHAINS[this.state.token_chain_id].token_decimals;

    //const usdc_address = this.CHAINS[this.state.token_chain_id].usdc_address;
    //const usdc_decimals = this.CHAINS[this.state.token_chain_id].usdc_decimals;

    let sell_amount = '1';
    for (let i = 0; i < usdc_decimals; i++) {
      sell_amount += '0';
    }

    const url_query = `?buyToken=${coin_address}&sellToken=${usdc_address}&sellAmount=${sell_amount}&chain_id=${1}`;

    const url = config.url_api + '/v1/swap/price' + url_query;
    const res_price = await axios.get(url);

    let price = Number(res_price.data.buyAmount);

    for (let i = 0; i < coin_decimals; i++) {
      price *= 0.1;
    }

    price = 1 / price;

    const receive = parseInt(
      (Number(pay_value) * price) / this.state.token_price
    );

    const state = {
      ...this.state,

      loading_receive: false,
      receive_value: receive,
    };

    this.setState(state);
  }

  async configure_remaining_buy(wallet_address, state) {
    const res_seed_sales = await axios.get(
      config.url_api + '/v1/seed-sales?from=' + wallet_address
    );

    const clients_transactions = res_seed_sales.data.filter(
      (current, index) => {
        if (current.from.toLowerCase() === wallet_address.toLowerCase()) {
          return current;
        }
      }
    );

    let total_buy = 0;
    for (let i = 0; i < clients_transactions.length; i++) {
      total_buy += Number(clients_transactions[i].value);
    }

    const coin_decimals = this.CHAINS[this.state.token_chain_id].token_decimals;
    for (let i = 0; i < coin_decimals; i++) {
      total_buy *= 0.1;
    }

    const remaining_buy = this.MAX_BUY - total_buy;

    if (remaining_buy <= 0.00001) {
      this.ref_knob_cursor.current.style.left = '100%';

      state.min_buy = 0;
      state.max_buy = 0;
      state.pay_value = 0;

      state.button_text = 'Maximum buy reached';
      state.button_disabled = true;

      this.fetch_receive(0);

      this.setState(state);

      return state;
    }

    state.button_job = 'BUY';
    state.button_text = 'Buy ' + this.state.token_symbol;
    state.button_disabled = false;

    if (remaining_buy < this.MIN_BUY) {
      this.ref_knob_cursor.current.style.left = '100%';

      state.min_buy = Number(remaining_buy.toFixed(4));
      state.max_buy = Number(remaining_buy.toFixed(4));
      state.pay_value = Number(remaining_buy.toFixed(4));

      this.fetch_receive(state.pay_value);

      this.setState(state);

      return state;
    }

    this.ref_knob_cursor.current.style.left = '0%';

    state.min_buy = this.MIN_BUY;
    state.max_buy = Number(remaining_buy.toFixed(4));
    state.pay_value = this.MIN_BUY;

    this.fetch_receive(this.MIN_BUY);

    this.setState(state);

    return state;
  }

  async get_contributers_count() {
    const res_seed_sales = await axios.get(config.url_api + '/v1/seed-sales');
    const addresses = []; // unique addresses

    for (let i = 0; i < res_seed_sales.data.length; i++) {
      let includes = false;

      for (let j = 0; j < addresses.length; j++) {
        if (res_seed_sales.data[i].from === addresses[j]) {
          includes = true;
          break;
        }
      }

      if (!includes) {
        addresses.push(res_seed_sales.data[i].from);
      }
    }

    return addresses.length;
  }

  init() {
    this.listen_wallet();
    this.update_time();
    this.update_balance();
    this.fetch_receive(this.state.pay_value);

    const interval_update_time = setInterval(() => {
      this.update_time(interval_update_time);
    }, 1000);

    const interval_balance = setInterval(() => {
      this.update_balance(interval_balance);
    }, 8000);
  }

  componentDidMount() {
    this.init();
    //this.__fulfill_transactions();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        onMouseMove={(e) => {
          this.on_mouse_move_knob(e);
        }}
        onMouseUp={(e) => {
          this.setState({
            ...this.state,

            ui_knob_cursor_mouse_down: false,
          });
        }}
        className={cn(style['seedsale'])}
      >
        {this.state.error ? (
          <div className={cn(style['seedsale-error'])}>{this.state.error}</div>
        ) : null}

        <div className={cn(style['seedsale-countdown'])}>
          <div
            ref={this.ref_countdown_title}
            className={cn(style['seedsale-countdown-title'])}
          >
            SEED SALE
          </div>

          <div className={cn(style['seedsale-countdown-values'])}>
            <div
              ref={this.ref_days}
              className={cn(style['seedsale-countdown-values-box'])}
            ></div>

            <div className={cn(style['seedsale-countdown-values-dots'])}>:</div>

            <div
              ref={this.ref_hours}
              className={cn(style['seedsale-countdown-values-box'])}
            ></div>

            <div className={cn(style['seedsale-countdown-values-dots'])}>:</div>

            <div
              ref={this.ref_minutes}
              className={cn(style['seedsale-countdown-values-box'])}
            ></div>

            <div className={cn(style['seedsale-countdown-values-dots'])}>:</div>

            <div
              ref={this.ref_seconds}
              className={cn(style['seedsale-countdown-values-box'])}
            ></div>
          </div>
        </div>

        <div className={cn(style['seedsale-amounts'])}>
          <div className={cn(style['seedsale-amounts-raised'])}>
            {this.state.total_sold +
              ' ' +
              this.state.token_symbol +
              ' ' +
              '(Sold)'}
          </div>

          <div className={cn(style['seedsale-amounts-target'])}>
            {this.state.total_amount + ' ' + this.state.token_symbol}
          </div>
        </div>

        <div className={cn(style['seedsale-bar'])}>
          <div
            ref={this.ref_progress}
            className={cn(style['seedsale-bar-progress'])}
          >
            <div
              className={cn(style['seedsale-bar-progress-reflection'])}
            ></div>
          </div>
        </div>

        <div className={cn(style['seedsale-knobarea'])}>
          <div
            ref={this.ref_knob}
            onClick={(e) => {
              this.on_mouse_move_knob(e, 'CLICK');
            }}
            onTouchMove={(e) => {
              this.on_mouse_move_knob(e.targetTouches[0]);
            }}
            className={cn(style['seedsale-knobarea-knob'])}
          >
            <div className={cn(style['seedsale-knobarea-knob-amounts'])}>
              <div className={cn(style['seedsale-knobarea-knob-amounts-min'])}>
                Min Buy
              </div>

              <div className={cn(style['seedsale-knobarea-knob-amounts-max'])}>
                Max Buy
              </div>
            </div>

            <div
              className={cn(
                style['seedsale-knobarea-knob-edge'],
                style['seedsale-knobarea-knob-edge1']
              )}
            ></div>

            <div
              className={cn(
                style['seedsale-knobarea-knob-edge'],
                style['seedsale-knobarea-knob-edge2']
              )}
            ></div>

            <div
              className={cn(
                style['seedsale-knobarea-knob-edge'],
                style['seedsale-knobarea-knob-edge3']
              )}
            ></div>

            <div
              className={cn(
                style['seedsale-knobarea-knob-edge'],
                style['seedsale-knobarea-knob-edge4']
              )}
            ></div>

            <div
              className={cn(
                style['seedsale-knobarea-knob-edge'],
                style['seedsale-knobarea-knob-edge5']
              )}
            ></div>

            <div className={cn(style['seedsale-knobarea-knob-line'])}></div>

            <div
              ref={this.ref_knob_cursor}
              className={cn(style['seedsale-knobarea-knob-cursor'])}
              onMouseDown={(e) => {
                this.setState({
                  ...this.state,

                  ui_knob_cursor_mouse_down: true,
                });
              }}
              onMouseUp={(e) => {
                this.setState({
                  ...this.state,

                  ui_knob_cursor_mouse_down: false,
                });
              }}
              onTouchStart={(e) => {
                this.setState({
                  ...this.state,

                  ui_knob_cursor_mouse_down: true,
                });
              }}
              onTouchEnd={(e) => {
                this.setState({
                  ...this.state,

                  ui_knob_cursor_mouse_down: false,
                });
              }}
            >
              <Icon_button
                className={cn(style['seedsale-knobarea-knob-cursor-button'])}
              />

              <Icon_pointer
                className={cn(style['seedsale-knobarea-knob-cursor-pointer'])}
              />

              <div
                className={cn(style['seedsale-knobarea-knob-cursor-amount'])}
              >
                {
                  Number(this.state.pay_value) < this.state.min_buy
                    ? this.state.min_buy
                    : this.state.pay_value /* +
                        ' ' +
                        this.CHAINS[this.state.token_chain_id].token_symbol */
                }
              </div>
            </div>
          </div>
        </div>

        <div className={cn(style['seedsale-inputarea'])}>
          <div className={cn(style['seedsale-inputarea-ctr'])}>
            <input
              className={cn(
                style['seedsale-inputarea-ctr-input'],

                Number(this.state.pay_value) < this.state.min_buy
                  ? style['seedsale-inputarea-ctr-inputerror']
                  : null
              )}
              value={this.state.pay_value}
              onChange={(e) => {
                this.on_change_input(e);
              }}
            />

            <div className={cn(style['seedsale-inputarea-ctr-symbol'])}>
              {this.CHAINS[this.state.token_chain_id].token_symbol}
            </div>
          </div>
        </div>

        <div className={cn(style['seedsale-arrow'])}>
          <Icon_keyboard_arrow_down />
        </div>

        <div
          className={cn(
            style['seedsale-inputarea'],
            style['seedsale-inputareasecond']
          )}
        >
          <div className={cn(style['seedsale-inputarea-ctr'])}>
            {this.state.loading_receive ? (
              <div className={cn(style['seedsale-inputarea-ctr-loading'])}>
                <Icon_loading />
              </div>
            ) : null}

            <input
              className={cn(style['seedsale-inputarea-ctr-input'])}
              readOnly
              value={this.state.receive_value}
              placeholder=""
            />

            <div className={cn(style['seedsale-inputarea-ctr-symbol'])}>
              {this.state.token_symbol}
            </div>
          </div>
        </div>

        <div className={cn(style['seedsale-buttonarea'])}>
          <button
            onClick={(e) => {
              this.on_click_button(e);
            }}
            className={cn(
              style['seedsale-buttonarea-button'],
              this.state.loading || this.state.button_disabled
                ? style['seedsale-buttonarea-buttondisabled']
                : null
            )}
          >
            {this.state.button_text}
          </button>
        </div>
      </div>
    );
  }
}

export default Seedsale;
