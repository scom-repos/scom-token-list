import { Wallet } from '@ijstech/eth-wallet';
import { ITokenObject, SITE_ENV } from './interface';
import { ChainNativeTokenByChainId, CoreContractAddressesByChainId } from './tokens/index';

const defaultChainId = 1;
const TOKENS = "oswap_user_tokens_";

export enum WalletPlugin {
  MetaMask = 'metamask',
  WalletConnect = 'walletconnect',
}

export const state = {
  currentChainId: 0,
  userTokens: {} as { [key: string]: ITokenObject[] },
  siteEnv: SITE_ENV.TESTNET
}

export function isWalletConnected() {
  const wallet = Wallet.getClientInstance();
  return wallet.isConnected;
}

export const getChainId = () => {
  const wallet = Wallet.getInstance();
  return isWalletConnected() ? wallet.chainId : defaultChainId;
}

export const hasMetaMask = function () {
  const wallet = Wallet.getClientInstance();
  return wallet?.clientSideProvider?.name === WalletPlugin.MetaMask;
}

export const setUserTokens = (token: ITokenObject, chainId: number) => {
  if (!state.userTokens[chainId]) {
    state.userTokens[chainId] = [token];
  } else {
    state.userTokens[chainId].push(token);
  }
}

export const hasUserToken = (address: string, chainId: number) => {
  return state.userTokens[chainId]?.some((token: ITokenObject) => token.address?.toLocaleLowerCase() === address?.toLocaleLowerCase());
}

export const setSiteEnv = (value: string) => {
  if (Object.values(SITE_ENV).includes(value as SITE_ENV)) {
    state.siteEnv = value as SITE_ENV;
  } else {
    state.siteEnv = SITE_ENV.TESTNET;
  }
}

export const getSiteEnv = (): SITE_ENV => {
  return state.siteEnv;
}

export const getDefaultChainId = () => {
  switch (getSiteEnv()) {
    case SITE_ENV.TESTNET:
      return 97
    case SITE_ENV.DEV:
    case SITE_ENV.MAINNET:
    default:
      return 56
  }
}

export const getUserTokens:(chainId: number) => any[] | null = (chainId: number) => {
  let tokens = localStorage[TOKENS + chainId];
  if (tokens) {
    tokens = JSON.parse(tokens);
  } else {
    tokens = [];
  }
  const userTokens = state.userTokens[chainId];
  if (userTokens && userTokens.length) {
    tokens = tokens.concat(userTokens);
  }
  return tokens.length ? tokens : null;
}

export function getAddresses(chainId: number) {
  return CoreContractAddressesByChainId[chainId];
};

export const getGovToken = (chainId: number): ITokenObject => {
  let govToken;
  let Address = getAddresses(chainId);
  if (chainId == 43113 || chainId == 43114) {
    govToken = { address: Address["GOV_TOKEN"], decimals: 18, symbol: "veOSWAP", name: 'Vote-escrowed OSWAP' };
  }  else {
    govToken = {address: Address["GOV_TOKEN"], decimals: 18, symbol: "OSWAP", name: 'OpenSwap'};
  }
  return govToken;
}

export const getChainNativeToken = (chainId: number): ITokenObject => {
  return ChainNativeTokenByChainId[chainId];
};

export const addUserTokens = (token: ITokenObject) => {
  const chainId = getChainId();
  let tokens = localStorage[TOKENS + chainId];
  let i = -1;
  if (tokens) {
    tokens = JSON.parse(tokens);
    i = tokens.findIndex((item: ITokenObject) => item.address == token.address);
  } else {
    tokens = [];
  }
  if (i == -1) {
    tokens.push(token);
  }
  localStorage[TOKENS + chainId] = JSON.stringify(tokens);
}
