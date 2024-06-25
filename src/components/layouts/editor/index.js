// MODULES
import React from 'react';
import cn from 'classnames';
import Script from 'next/script';

// COMPONENTS
import Aside from './aside';
import Header from './header';
import Toaster from '../../toaster';

// CONFIG
import config from '../../../config';

// CONTEXT
import { Context } from '../../../context';

// UTILS
import UTILS from '../../../utils/index.js';
import UTILS_API from '../../../utils/api.js';

// STYLES
import style from './style.module.css';

class EditorLayout extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {};

    this.init = this.init.bind(this);
  }

  async init() {
    UTILS_API.profile_get().then((res_profile) => {
      if (res_profile.code) {
        return;
      }

      if (!res_profile.data) {
        this.context.set_state({
          ...this.context.state,

          user_auth: false,
        });

        return;
      }

      this.context.set_state({
        ...this.context.state,

        user_auth: true,
        user: res_profile.data,
      });
    });
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MCX6G3QJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <Header
          mobile={
            this.props.pathname === '/factory' ||
            this.props.pathname === '/swap' ||
            this.props.pathname === '/'
              ? false
              : true
          }
        />

        <Aside />
        <Toaster />

        <main className={cn(style['main'])}>{this.props.children}</main>

        <Script
          id="1"
          src="https://js.hcaptcha.com/1/api.js"
          async
          defer
        ></Script>

        <div
          className="h-captcha"
          data-sitekey={config.env_captcha_key}
          data-theme="dark"
          data-error-callback="onError"
          data-size="invisible"
        ></div>
      </>
    );
  }
}

export default EditorLayout;
