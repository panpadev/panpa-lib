export const CONFIG = {
  // env
  env_captcha_key: '9bce44da-31e2-4524-9f66-40b80b0620be',

  // url
  url_ui: 'https://panpa.dev',
  url_api: 'https://api.panpa.dev',
  url_server: 'https://server.panpa.dev',

  // blockchain
  /* supported chains */
  blockchain_chains: {
    1: {
      name: 'Ethereum Mainnet',
      token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      token_name: 'Ethereum',
      token_symbol: 'ETH',
      token_decimals: 18,
      token_img: '/images/ethereum.png',
      usdt_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      usdt_decimals: 6,
      usdc_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      usdc_decimals: 6,
      dai_address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      dai_decimals: 18,
      url_explorer: 'https://etherscan.io',
    },
    56: {
      name: 'Binance Smart Chain',
      token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      token_name: 'BNB',
      token_symbol: 'BNB',
      token_decimals: 18,
      token_img: '/images/bnb.png',
      usdt_address: '0x55d398326f99059ff775485246999027b3197955',
      usdt_decimals: 18,
      usdc_address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      usdc_decimals: 18,
      dai_address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
      dai_decimals: 18,
      url_explorer: 'https://bscscan.com',
    },
    137: {
      name: 'Polygon Mainnet',
      token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      token_name: 'Polygon',
      token_symbol: 'MATIC',
      token_decimals: 18,
      token_img: '/images/polygon.png',
      usdt_address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      usdt_decimals: 6,
      usdc_address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      usdc_decimals: 6,
      dai_address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      dai_decimals: 18,
      url_explorer: 'https://polygonscan.com',
    },
    /*
    '250': {
      name: 'Fantom Mainnet',
      token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      token_name: 'Fantom',
      token_symbol: 'FTM',
      token_decimals: 18,
      token_img: "/images/fantom.png",
      usdt_address: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
      usdt_decimals: 6,
      usdc_address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      usdc_decimals: 6,
      dai_address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E",
      dai_decimals: 18,
      url_explorer: "https://ftmscan.com",
    },
    */
    42161: {
      name: 'Arbitrum Mainnet',
      token_address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      token_name: 'Arbitrum',
      token_symbol: 'ARB',
      token_decimals: 18,
      token_img: '/images/arbitrum.png',
      usdt_address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      usdt_decimals: 6,
      usdc_address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      usdc_decimals: 6,
      dai_address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      dai_decimals: 18,
      url_explorer: 'https://arbiscan.io',
    },
    /*
    42220: {
      name: 'Celo Mainnet',
      token_address: '0x471ece3750da237f93b8e339c536989b8978a438',
      token_name: 'Celo',
      token_symbol: 'CELO',
      token_decimals: 18,
      token_img: '/images/celo.png',
      usdt_address: '',
      usdt_decimals: 0,
      usdc_address: '0x37f750b7cc259a2f741af45294f6a16572cf5cad',
      usdc_decimals: 6,
      dai_address: '',
      dai_decimals: 0,
      url_explorer: 'https://celoscan.io/',
    },
    */
    43114: {
      name: 'Avalanche Mainnet C-Chain',
      token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      token_name: 'Avalanche',
      token_symbol: 'AVAX',
      token_decimals: 18,
      token_img: '/images/avalanche.png',
      usdt_address: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
      usdt_decimals: 6,
      usdc_address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
      usdc_decimals: 6,
      dai_address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
      dai_decimals: 18,
      url_explorer: 'https://snowtrace.io/',
    },
    11155111: {
      // Sepolia Testnet
      name: 'Sepolia Testnet',
      token_address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      token_name: 'Sepolia Testnet',
      token_symbol: 'SepoliaETH',
      token_decimals: 18,
      token_img: '/images/token.png',
      usdt_address: '0x7169d38820dfd117c3fa1f22a697dba58d90ba06',
      usdt_decimals: 6,
      usdc_address: '0xf08A50178dfcDe18524640EA6618a1f965821715',
      usdc_decimals: 6,
      dai_address: '0x68194a729C2450ad26072b3D33ADaCbcef39D574',
      dai_decimals: 18,
      url_explorer: 'https://sepolia.etherscan.io',
    },
  },
};

Object.freeze(CONFIG);

export default CONFIG;
