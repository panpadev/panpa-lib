// MODULES
import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

// COMPONENTS
import Head from '../../components/head';

// CONFIG
import config from '../../config';

// STYLES
import style from './style.module.css';

class Error extends React.Component {
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
        <Head
          title="404 | Panpa"
          desc="Opps this page is not written yet. Please go to home page"
        />

        <main>
          <section className={cn('section', style['sectionerror'])}>
            <div className={cn(style['sectionerror-ctr'])}>
              <div className={cn(style['sectionerror-ctr-title'])}>
                {this.props.data}
              </div>

              <div className={cn(style['sectionerror-ctr-desc'])}>
                {this.props.data === 404
                  ? "Sorry, couldn't find the page you are looking for."
                  : null}
              </div>

              <a
                className={cn(style['sectionerror-ctr-homebtn'])}
                href={config.url_ui}
              >
                Go home
              </a>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default Error;
