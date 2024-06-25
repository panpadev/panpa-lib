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
        <Head title="PANPA - Wise Developer" />

        <BlankLayout pathname={this.props.pathname}>
          <section className={cn(style['sectionfactory'])}>
            <h2 className={cn(style['sectionfactory-header'])}>
              PANPA FACTORY
            </h2>

            <div
              ref={this.ref_factory}
              className={cn(style['sectionfactory-factory'])}
            >
              <Factory />
            </div>

            <div className={cn(style['sectionfactory-docs'])}>
              <a
                target="_blank"
                className={cn(style['sectionfactory-docs-link'])}
                href="https://github.com/panpadev/panpa-api/blob/main/contracts/StandardToken.sol"
              >
                SEE THE SOURCE CODE OF THE CONTRACT THAT OUR FACTORY DEPLOY TO
                VIRTUAL MACHINE, ITS THE STANDARD TOKEN WITH ALL THE REQUIRED
                FUNCTIONS
              </a>
            </div>
          </section>

          <section className={cn(style['sectionswap'])}>
            <h2 className={cn(style['sectionswap-header'])}>PANPA SWAP</h2>

            <div className={cn(style['sectionswap-swap'])}>
              <Swap title="Panpa Swap" />
            </div>

            <div className={cn(style['sectionswap-docs'])}>
              <a
                className={cn(style['sectionswap-docs-link'])}
                target="_blank"
                href="https://docs.panpa.dev"
              >
                SUPPORTS MORE THEN 10,000 TOKENS ACROSS 8 DIFFERENT CHAINS
              </a>
            </div>
          </section>

          <section className={cn(style['sectionaudit'])}>
            <h2 className={cn(style['sectionaudit-header'])}>AUDIT</h2>

            <div
              ref={this.ref_audit}
              className={cn(style['sectionaudit-audit'])}
            >
              <Audit
                address={this.state.audit_address}
                chainId={this.state.audit_chain_id}
              />
            </div>

            <div className={cn(style['sectionaudit-docs'])}>
              <a
                className={cn(style['sectionaudit-docs-link'])}
                target="_blank"
                href="#"
              >
                ANALYSE ALL THE PARAMERTS OF THE TOKENS AMONG ALL THE CHAINS
              </a>
            </div>
          </section>

          <section className={cn(style['sectiongraph'])}>
            <h2 className={cn(style['sectiongraph-header'])}>GRAPH</h2>

            <div className={cn(style['sectiongraph-audit'])}>
              <Graph />
            </div>

            <div className={cn(style['sectiongraph-docs'])}>
              <a
                className={cn(style['sectiongraph-docs-link'])}
                target="_blank"
                href="#"
              >
                DISPLAY TOKEN'S PRICE ACTION ACROSS TIME
              </a>
            </div>
          </section>
        </BlankLayout>
      </>
    );
  }
}

export default Home;
