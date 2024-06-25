// MODULES
import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

// COMPONENTS
import Icon_user from '../../../icons/user';
import Icon_token_swap from '../../../icons/token_swap';
import Icon_factory from '../../../icons/factory';
import Icon_notification from '../../../icons/notification';
import Icon_audit from '../../../icons/audit';
import Icon_rocket from '../../../icons/rocket';
import Icon_home from '../../../icons/home';
import Icon_login from '../../../icons/login';
import Icon_offer from '../../../icons/offer';

// CONFIG
import config from '../../../../config';

// CONTEXT
import { Context } from '../../../../context';

// UTILS
import UTILS from '../../../../utils/index';
import UTILS_API from '../../../../utils/api';

// STYLES
import style from './style.module.css';

class EditorAside extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);

    this.state = {
      pathname: '',
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,

      pathname: window.location.pathname,
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <aside className={cn(style['aside'])}>
        <div className={cn(style['aside-inner'])}>
          <div className={cn(style['aside-inner-logoarea'])}>
            <Image
              src="/images/favicon.ico"
              width="68"
              height="68"
              alt="panpa-logo"
              title="Logo"
              className={cn(style['aside-logoarea-logo'])}
            />
          </div>

          <a
            className={cn(
              style['aside-inner-link'],
              this.state.pathname === '/'
                ? style['aside-inner-linkselected']
                : null
            )}
            href={config.url_ui}
            alt="panpa-home"
            title="panpa.dev Home"
          >
            <div className={cn(style['aside-inner-link-icon'])}>
              <Icon_home />
            </div>

            <span className={cn(style['aside-inner-link-title'])}>Home</span>
          </a>

          <a
            className={cn(
              style['aside-inner-link'],
              this.state.pathname === '/factory'
                ? style['aside-inner-linkselected']
                : null
            )}
            href={config.url_ui + '/factory'}
            alt="factory"
            title="Token Factory"
          >
            <div className={cn(style['aside-inner-link-icon'])}>
              <Icon_factory />
            </div>

            <span className={cn(style['aside-inner-link-title'])}>
              Token Factory
            </span>
          </a>

          <a
            className={cn(
              style['aside-inner-link'],
              this.state.pathname === '/swap'
                ? style['aside-inner-linkselected']
                : null
            )}
            href={config.url_ui + '/swap'}
            alt="swap"
            title="Token Swap"
          >
            <div className={cn(style['aside-inner-link-icon'])}>
              <Icon_token_swap />
            </div>

            <span className={cn(style['aside-inner-link-title'])}> Swap</span>
          </a>

          <a
            className={cn(
              style['aside-inner-link'],
              this.state.pathname === '/launchpads'
                ? style['aside-inner-linkselected']
                : null
            )}
            href={config.url_ui + '/launchpads'}
            alt="launchpad"
            title="Launchpad"
          >
            <div className={cn(style['aside-inner-link-icon'])}>
              <Icon_rocket />
            </div>

            <span className={cn(style['aside-inner-link-title'])}>
              Launchpad
            </span>
          </a>

          <a
            className={cn(
              style['aside-inner-link'],
              this.state.pathname === '/audit'
                ? style['aside-inner-linkselected']
                : null
            )}
            href={config.url_ui + '/audit'}
            alt="audit"
            title="Audit"
          >
            <div className={cn(style['aside-inner-link-icon'])}>
              <Icon_audit />
            </div>

            <span className={cn(style['aside-inner-link-title'])}>Audit</span>
          </a>

          <a
            className={cn(
              style['aside-inner-link'],
              this.state.pathname === '/seed-sale'
                ? style['aside-inner-linkselected']
                : null
            )}
            id={cn(style['aside-inner-linkseedsale'])}
            href={config.url_ui + '/seed-sale'}
            alt="seed-sale"
            title="Seed sale (DEVC)"
          >
            <div className={cn(style['aside-inner-link-icon'])}>
              <Icon_offer />
            </div>

            <span className={cn(style['aside-inner-link-title'])}>
              Seed sale
            </span>
          </a>

          {this.context.state.user_auth ? (
            <a
              className={cn(
                style['aside-inner-link'],
                this.state.pathname === '/profile'
                  ? style['aside-inner-linkselected']
                  : null
              )}
              id={cn(style['aside-inner-linkprofile'])}
              href={config.url_ui + '/profile'}
              alt="profile"
              title="Profile"
            >
              <div className={cn(style['aside-inner-link-icon'])}>
                <Icon_user />
              </div>

              <span className={cn(style['aside-inner-link-title'])}>
                Profile
              </span>
            </a>
          ) : null}

          {this.context.state.user_auth === false ? (
            <a
              className={cn(
                style['aside-inner-link'],
                this.state.pathname === '/signin'
                  ? style['aside-inner-linkselected']
                  : null
              )}
              id={cn(style['aside-inner-linkprofile'])}
              href={config.url_ui + '/signin'}
              alt="signin"
              title="Sign in"
            >
              <div className={cn(style['aside-inner-link-icon'])}>
                <Icon_login />
              </div>

              <span className={cn(style['aside-inner-link-title'])}>
                Sign In
              </span>
            </a>
          ) : null}
        </div>

        <div className={cn(style['aside-bottom'])}>
          <div className={cn(style['aside-bottom-left'])}></div>
          <div className={cn(style['aside-bottom-right'])}>
            <div className={cn(style['aside-bottom-right-icon'])}>
              <Icon_notification />
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default EditorAside;
