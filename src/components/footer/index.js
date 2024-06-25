// MODULES
import React from 'react';
import cn from 'classnames';

// COMPONENTS
import Slider from '../slider';
import Icon_x from '../icons/x';
import Icon_instagram from '../icons/instagram';
import Icon_telegram from '../icons/telegram';

// CONTEXT
import { Context } from '../../context';

// STYLES
import style from './style.module.css';

class Footer extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.on_scroll = this.on_scroll.bind(this);

    this.ref_title = React.createRef();
    this.ref_desc = React.createRef();
    this.ref_bottom = React.createRef();
  }

  on_scroll() {
    const elements = [
      this.ref_title.current,
      this.ref_desc.current,
      this.ref_bottom.current,
    ];

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].getBoundingClientRect().y < window.innerHeight - 300) {
        elements[i].classList.add(style['scrollbounce']);
      }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.on_scroll);
    this.on_scroll();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('scroll', this.on_scroll);
  }

  render() {
    return (
      <footer className={cn(style['footer'])}>
        <h3 ref={this.ref_title} className={cn(style['footer-header'])}>
          PANPA
        </h3>

        <div ref={this.ref_desc} className={cn(style['footer-desc'])}>
          <div className={cn(style['footer-desc-inner'])}>
            BECOME PART OF THE DEVELOPER ARMY
          </div>
        </div>

        <div ref={this.ref_bottom} className={cn(style['footer-bottom'])}>
          <div className={cn(style['footer-bottom-inner'])}>
            <div className={cn(style['footer-bottom-inner-left'])}>
              <a
                target="_blank"
                href="https://app.uniswap.org"
                className={cn(style['footer-bottom-inner-left-buy'])}
              >
                OPEN YOUR MIND
              </a>

              <div className={cn(style['footer-bottom-inner-left-socials'])}>
                <a
                  className={cn(style['footer-bottom-inner-left-socials-link'])}
                  href="https://x.com/panpadev"
                  target="_blank"
                >
                  <Icon_x />
                </a>

                <a
                  className={cn(style['footer-bottom-inner-left-socials-link'])}
                  href="https://instagram.com/panpadev"
                  target="_blank"
                >
                  <Icon_instagram />
                </a>

                <a
                  className={cn(style['footer-bottom-inner-left-socials-link'])}
                  href="https://t.me/panpadev"
                  target="_blank"
                >
                  <Icon_telegram />
                </a>
              </div>
            </div>

            <div className={cn(style['footer-bottom-inner-right'])}>
              <img
                className={cn(style['footer-bottom-inner-right-img'])}
                src="/images/panpa-14.png"
                alt="panpa-footer"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
