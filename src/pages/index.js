// MODULES
import Web3 from 'web3';
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import cn from 'classnames';

// COMPONENTS
import Head from '../components/head';
import EditorLayout from '../components/layouts/editor';
import BlankLayout from '../components/layouts/blank';
import Graph from '../components/graph/index.js';
import Swap from '../components/swap/index.js';
import Factory from '../components/factory/index.js';
import Table from '../components/table';
import Audit from '../components/audit';
import Slider from '../components/slider';
import Seedsale from '../components/seedsale';
import Tokenomics_v2 from '../components/tokenomics_v2';

import Icon_x from '../components/icons/x';
import Icon_instagram from '../components/icons/instagram';
import Icon_telegram from '../components/icons/telegram';

// CONFIG
import config from '../config';

// CONTEXT
import { Context } from '../context';

// UTILS
import { wallet_connect } from '../utils/index.js';
import UTILS_API from '../utils/api.js';

// STYLES
import style from '../styles/pages/home.module.css';

// SERVER SIDE
export async function getServerSideProps({ req }) {
  return {
    props: {
      pathname: req.url,
    },
  };
}

// HOME PAGE
class Home extends React.Component {
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
        <Head title="PANPA Library" />

        <BlankLayout pathname={this.props.pathname}>
          <section className={cn(style['sectionfactory'])}>
            <Factory />
          </section>

          <section className={cn(style['sectionswap'])}>
            <Swap title="Panpa Swap" />
          </section>

          <section className={cn(style['sectionaudit'])}>
            <Audit
              address="0xfED87d9218f2E609801E453E91D2BcA446228b94"
              chainId={1}
            />
          </section>

          <section className={cn(style['sectiongraph'])}>
            <Graph />
          </section>
        </BlankLayout>
      </>
    );
  }
}

export default Home;
