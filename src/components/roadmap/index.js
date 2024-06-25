// MODULES
import Web3 from 'web3';
import React from 'react';
import axios from 'axios';
import cn from 'classnames';

// COMPONENTS
import Icon_check from '../icons/check';
import Icon_sand_watch from '../icons/sand_watch';
import Icon_clock from '../icons/clock';

// CONFIG
import config from '../../config';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

// SERVER SIDE
export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

// HOME PAGE
class Roadmap extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      roadmap: [
        {
          title: 'Q1 - Core Products',
          list: [
            { desc: 'Token factory', finished: true },
            { desc: 'Swap', finished: true },
            { desc: 'Audit', finished: true },
            {
              desc: 'Continue to develop more components for developers',
              finished: true,
            },
            { desc: 'Preparing for seed sale', finished: true },
            { desc: "Define the project's tokenomics", finished: true },
          ],
        },
        {
          title: 'Q2 - DEVC Token',
          list: [
            {
              desc: 'Begin smart contract development for mainnet',
              finished: false,
            },
            { desc: 'Seed sale marketing', finished: false },
            {
              desc: '$DEVC Token Seed sale for potential partners',
              finished: false,
            },
            { desc: 'Preparing for seed sale', finished: true },
            {
              desc: 'Explore potential partnerships with tech and blockchain companies.',
              finished: false,
            },
          ],
        },
        {
          title: 'Q3 - Expansion',
          list: [
            {
              desc: 'Conduct a presale event to secure initial funding and community support.',
              finished: false,
            },
            { desc: 'Listing on Uniswap', finished: false },
            {
              desc: 'Adding a much more token type for token factory mainnet/testnet',
              finished: false,
            },
            {
              desc: 'Begin to develop web3 game engine with community',
              finished: true,
            },
            { desc: 'Quick Audit for testnet', finished: false },
          ],
        },
      ],
    };

    this.on_scroll = this.on_scroll.bind(this);

    this.refs_box = [];
  }

  on_scroll() {
    for (let i = 0; i < this.refs_box.length; i++) {
      const box = this.refs_box[i].current;

      if (!box) {
        continue;
      }

      const box_rect = box.getBoundingClientRect();

      const animation = box.getAttribute('data-animation');

      if (animation) {
        continue;
      }

      if (box_rect.y < window.innerHeight - 200 && !animation) {
        let class_animation = style['roadmap-section-boxanimationleft'];

        if (i % 2 === 0) {
          class_animation = style['roadmap-section-boxanimationright'];
        }

        box.classList.add(class_animation);
        box.setAttribute('data-animation', '1');
      }
    }
  }

  componentDidMount() {
    this.on_scroll();

    window.addEventListener('scroll', this.on_scroll);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('scroll', this.on_scroll);
  }

  render() {
    return (
      <div className={cn(style['roadmap'])}>
        <div className={cn(style['roadmap-midline'])}></div>

        {this.state.roadmap.map((current, index) => {
          const ref_box = React.createRef();
          this.refs_box.push(ref_box);

          return (
            <div
              key={index}
              className={cn(
                style['roadmap-section'],
                index % 2 === 0 ? style['roadmap-sectionright'] : null
              )}
            >
              <div ref={ref_box} className={cn(style['roadmap-section-box'])}>
                <h5 className={cn(style['roadmap-section-box-title'])}>
                  {current.title}
                </h5>

                {current.list.map((current_list, index_list) => {
                  return (
                    <div
                      key={index_list}
                      className={cn(style['roadmap-section-box-item'])}
                    >
                      {current_list.finished ? (
                        <div
                          className={cn(
                            style['roadmap-section-box-item-icon'],
                            style['roadmap-section-box-item-iconfinished']
                          )}
                        >
                          <Icon_check />
                        </div>
                      ) : (
                        <div
                          className={cn(style['roadmap-section-box-item-icon'])}
                        >
                          <Icon_clock />
                        </div>
                      )}{' '}
                      &nbsp; {current_list.desc}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Roadmap;
