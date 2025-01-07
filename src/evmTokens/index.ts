import { ITokenObject } from "../interface";
import { Tokens_Avalanche, Tokens_BSC, Tokens_Cronos, Tokens_Ethereuem, Tokens_Fantom, Tokens_Polygon, Tokens_Arbitrum, Tokens_ZK } from "./mainnet/index";
import { Tokens_Amino, Tokens_AminoXTestnet, Tokens_BSC_Testnet, Tokens_Cronos_Testnet, Tokens_Fantom_Testnet, Tokens_Fuji, Tokens_Mumbai, Tokens_Arbitrum_Goerli, Tokens_ZK_Sepolia } from "./testnet/index";

const chainIdToNetworkCode: { [chainId: number]: string } = {
  1: 'ETH',
  25: 'CRO',
  56: 'BSC',
  97: 'BSC-TESTNET',
  137: 'MATIC',
  338: 'CRO-TESTNET',
  31337: 'ACT',
  80001: 'MUMBAI',
  43113: 'FUJI',
  43114: 'AVAX',
  250: 'FTM',
  4002: 'FTM-TESTNET',
  13370: 'ACT-TESTNET',
  42161: 'ARB',
  421613: 'ARB-GOERLI',
  300: 'ZK-SEPOLIA',
  324: 'ZK'
}

const DefaultERC20Tokens: { [chainId: number]: ITokenObject[] } = {
  1: Tokens_Ethereuem.map(v => ({ ...v, chainId: 1 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  25: Tokens_Cronos.map(v => ({ ...v, chainId: 25 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  56: Tokens_BSC.map(v => ({ ...v, chainId: 56 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  97: Tokens_BSC_Testnet.map(v => ({ ...v, chainId: 97 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  137: Tokens_Polygon.map(v => ({ ...v, chainId: 137 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  338: Tokens_Cronos_Testnet.map(v => ({ ...v, chainId: 338 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  31337: Tokens_Amino.map(v => ({ ...v, chainId: 31337 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  80001: Tokens_Mumbai.map(v => ({ ...v, chainId: 80001 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  43113: Tokens_Fuji.map(v => ({ ...v, chainId: 43113 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  43114: Tokens_Avalanche.map(v => ({ ...v, chainId: 43114 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  250: Tokens_Fantom.map(v => ({ ...v, chainId: 250 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  4002: Tokens_Fantom_Testnet.map(v => ({ ...v, chainId: 4002 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  13370: Tokens_AminoXTestnet.map(v => ({ ...v, chainId: 13370 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  42161: Tokens_Arbitrum.map(v => ({ ...v, chainId: 42161 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  421613: Tokens_Arbitrum_Goerli.map(v => ({ ...v, chainId: 421613 })).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  300: Tokens_ZK_Sepolia.map(v => { return { ...v, chainId: 300 } }).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] })),
  324: Tokens_ZK.map(v => { return { ...v, chainId: 324 } }).map(v => ({ ...v, networkCode: chainIdToNetworkCode[v.chainId] }))
}

const ChainNativeTokenByChainId: { [chainId: number]: ITokenObject } = {
  1: { address: undefined, decimals: 18, symbol: "ETH", name: 'ETH', isNative: true, chainId: 1, networkCode: 'ETH' }, // Ethereum Mainnet
  25: { address: undefined, decimals: 18, symbol: "CRO", name: 'CRO', isNative: true, chainId: 25, networkCode: 'CRO' }, //cronos
  56: { address: undefined, decimals: 18, symbol: "BNB", name: 'BNB', isNative: true, chainId: 56, networkCode: 'BSC' }, // Binance Mainnet
  97: { address: undefined, decimals: 18, symbol: "BNB", name: 'BNB', isNative: true, chainId: 97, networkCode: 'BSC-TESTNET' }, // Binance Test Chain
  137: { address: undefined, decimals: 18, symbol: "MATIC", name: 'MATIC', isNative: true, chainId: 137, networkCode: 'MATIC' }, //Polygon
  338: { address: undefined, decimals: 18, symbol: "TCRO", name: 'TCRO', isNative: true, chainId: 338, networkCode: 'CRO-TESTNET' }, //cronos
  31337: { address: undefined, decimals: 18, symbol: "ACT", name: 'ACT', isNative: true, chainId: 31337, networkCode: 'ACT' }, //Amino Testnet
  80001: { address: undefined, decimals: 18, symbol: "MATIC", name: 'MATIC', isNative: true, chainId: 80001, networkCode: 'MUMBAI' }, //Mumbai, Polygon testnet
  43114: { address: undefined, decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true, chainId: 43114, networkCode: 'AVAX' }, //Avalanche Mainnet C-Chain
  43113: { address: undefined, decimals: 18, symbol: "AVAX", name: 'AVAX', isNative: true, chainId: 43113, networkCode: 'FUJI' },  //Avalanche FUJI C-Chain
  250: { address: undefined, decimals: 18, symbol: "FTM", name: 'FTM', isNative: true, chainId: 250, networkCode: 'FTM' }, // Fantom Opera
  4002: { address: undefined, decimals: 18, symbol: "FTM", name: 'FTM', isNative: true, chainId: 4002, networkCode: 'FTM-TESTNET' }, // Fantom Testnet
  13370: { address: undefined, decimals: 18, symbol: "ACT", name: 'ACT', isNative: true, chainId: 13370, networkCode: 'ACT-TESTNET' }, //Amino X Testnet
  42161: { address: undefined, decimals: 18, symbol: "ETH", name: 'ETH', isNative: true, chainId: 42161, networkCode: 'ARB' }, // Arbitrum One
  421613: { address: undefined, decimals: 18, symbol: "ETH", name: 'ETH', isNative: true, chainId: 421613, networkCode: 'ARB-GOERLI' }, // Arbitrum Goerli
  300: { address: undefined, decimals: 18, symbol: "ETH", name: 'ETH', isNative: true, chainId: 300, networkCode: 'ZK-SEPOLIA' }, // zk Sepolia
  324: { address: undefined, decimals: 18, symbol: "ETH", name: 'ETH', isNative: true, chainId: 324, networkCode: 'ZK' }, // zk mainnet
};

const WETHByChainId = Object.keys(DefaultERC20Tokens).reduce((result: {[chainId: number]: ITokenObject}, key: string) => {
  let weth = DefaultERC20Tokens[Number(key)].find(v => v.isWETH);
  if (!weth) console.log(`No Default Wrapped Native Token on chain ${key}`);
  result[Number(key)] = weth!;
  return result
}, {});

const getOpenSwapToken = (chainId:number) => {
  let tokens = DefaultERC20Tokens[chainId];
  if (!tokens) return null;
  for (const token of tokens) {
    if (token.name == "OpenSwap" && token.symbol == "OSWAP") return token;
  }
  return null;
}

const DefaultTokens = Object.keys(ChainNativeTokenByChainId).reduce((result: {[chainId: number]: ITokenObject[]}, key: string) => {
  result[Number(key)] = [...DefaultERC20Tokens[Number(key)], ChainNativeTokenByChainId[Number(key)]]
  return result
}, {});

const DefaultTokensByNetworkCode = Object.values(ChainNativeTokenByChainId).reduce((result: {[networkCode: string]: ITokenObject[]}, token) => {
  result[token.networkCode] = [...DefaultERC20Tokens[token.chainId], token]
  return result
}, {});

//not adjusted for cronos and its testnet
const ToUSDPriceFeedAddressesMap: { [chainId: number]: {[token:string]:string} } = {
  56: {
    '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c': '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE', //BNB
    '0x55d398326f99059ff775485246999027b3197955': '0xB97Ad0E74fa7d920791E90258A6E2085088b4320', //USDT
    '0xe9e7cea3dedca5984780bafc599bd69add087d56': '0xcBb98864Ef56E9042e7d2efef76141f15731B82f', //BUSD
  },
  97: {
    '0xae13d989dac2f0debff460ac112a837c89baa7cd': '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526', //BNB
    '0x29386b60e0a9a1a30e1488ada47256577ca2c385': '0xEca2605f0BCF2BA5966372C99837b1F182d3D620', //USDT
    '0xde9334c157968320f26e449331d6544b89bbd00f': '0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa', //BUSD
    '0xb78daa2f1a2de8270a5641f052fafc4b2b3ea3b1': '0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa', //BUSD       
  },
  43113: {
    '0xd00ae08403b9bbb9124bb305c09058e32c39a48c': '0x5498BB86BC934c8D34FDA08E81D444153d0D06aD', //AVAX
    '0xb9c31ea1d475c25e58a1be1a46221db55e5a7c6e': '0x7898AcCC83587C3C55116c5230C17a6Cd9C71bad', //USDT.e  
  },
  43114: {
    '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': '0x0A77230d17318075983913bC2145DB16C7366156', //AVAX
    '0xc7198437980c041c805a1edcba50c1ce5db95118': '0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a', //USDT.e  
    '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664': '0xF096872672F44d6EBA71458D74fe67F9a77a23B9', //USDC.e  
  }
}
//not adjusted for cronos and its testnet
const tokenPriceAMMReference: { [chainId: number]: {[token:string]:string}} = { //lowercase on token address only
  56: {
    "0xb32ac3c79a94ac1eb258f3c830bbdbc676483c93": "0x6AA3eC903176df556e8D8473A002b6A807399351", // OSWAP: OSWAP & BNB (Oswap-LP)
    "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16", // BNB : BNB & BUSD (Pancake-LP)
    "0x0b15ddf19d47e6a86a56148fb4afffc6929bcb89": "0x71E6de81381eFE0Aa98f56b3B43eB3727D640715", // IDIA : IDIA & BUSD (Pancake-LP)
    "0x416947e6fc78f158fd9b775fa846b72d768879c2" : "0xe6A97E7B5EB2FA72A8B4BeDaaf4CdE85E015DAbf",// OGS : OGS & BUSD (IF)
    "0x31720b2276df3b3b757b55845d17eea184d4fc8f" : "0x0DBCe9e7b634B5eAAAb483194CC3224Fde9624CF" // OAX : OAX & BNB (OSWAP-LP)
  },
  97: {
    "0x45eee762aaea4e5ce317471bda8782724972ee19": "0xb0094FfE387da1739FB95bAbCAF01B105FD0D887", // OSWAP: OSWAP & BNB
    "0xae13d989dac2f0debff460ac112a837c89baa7cd": "0x4A63235712c5F56796b8120DE9195626cf7496f1", // BNB : BNB & BUSD
    "0xc2c76387eb1cd15f2f55d2463b5aad6fca062eb1": "0xd2401ED7A6444CB96EE78424a222A51788E90060", // mOSWAP: mOSWAP & OSWAP
    "0x52423b7f0769d0365ebdd79342ce167eb9c29ae2": "0x34aE455fC2d8C808471f7A6967eee858C61cc838", // IDIA: IDIA & BUSD
    "0xb79aa5c1730ad78dd958f05fd87022aef3e50721": "0x902d79f7Dc980D9b21D691F5F0737ce11f352eB9", // TT: BNB & TT
    "0x8677048f3ed472610514ba6ef6ec2f03b550ebdb": "0x095307dEac764FDC521fE2E3cf8EDf0f40B00F17", // Oax: Oax & BNB
  },
  43113: {
    "0x78d9d80e67bc80a11efbf84b7c8a65da51a8ef3c": "0x239b4EaF1746051b1bED34dC2963f053c4649f88", // OSWAP : OSWAP & AVAX
    "0xd00ae08403B9bbb9124bB305C09058E32C39A48c": "0x0f98073122cc43596eF645Ae51FE085f355C487e"  // AVAX : AVAX & USDT.e
  },
  43114: {
    "0xb32ac3c79a94ac1eb258f3c830bbdbc676483c93": "0xBeaE5AaA6d76ABe711336801D590850e18cB3C6b", // OSWAP : OSWAP & AVAX      
  }
}

export {
  DefaultERC20Tokens,
  ChainNativeTokenByChainId,
  WETHByChainId,
  DefaultTokens,
  DefaultTokensByNetworkCode,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference,
  getOpenSwapToken
}