// MODULES
import React from 'react';
import Head from 'next/head';

// CONFIG
import config from '../../config';

class HeadTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Head lang="en">
        <title>{this.props.title}</title>

        <script
          id="3"
          dangerouslySetInnerHTML={{
            __html:
              "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MCX6G3QJ');",
          }}
        ></script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Chewy&family=Rubik+Doodle+Shadow&display=swap"
          rel="stylesheet"
        />

        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="title" content={this.props.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={this.props.desc} />

        <meta property="og:image" content={config.url_ui + '/favicon.ico'} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="panpa" />
        <meta property="og:title" content={this.props.title} />
        <meta property="og:description" content={this.props.desc} />
        <meta property="og:url" content={config.url_ui} />

        <meta name="twitter:site" content="@panpa" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@panpa" />
        <meta name="twitter:description" content={this.props.desc} />
        <meta name="twitter:image" content={config.url_ui + '/favicon.ico'} />

        <link rel="apple-touch-icon" href={config.url_ui + '/favicon.ico'} />
        <link
          rel="icon"
          href={config.url_ui + '/favicon.ico'}
          type="image/x-icon"
        />
        <link rel="manifest" href={config.url_ui + '/manifest.json'} />
      </Head>
    );
  }
}

HeadTag.defaultProps = {
  title: 'PANPA - Wise Developer',
  desc: 'Panpa is a wise developer who open minds.',
};

export default HeadTag;
