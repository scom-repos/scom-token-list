import { Wallet } from '@ijstech/eth-wallet';
import { ITokenObject } from './interface';
import { ChainNativeTokenByChainId } from './tokens/index';

const TOKENS = "oswap_user_tokens_";

export enum WalletPlugin {
  MetaMask = 'metamask',
  WalletConnect = 'walletconnect',
}

export const state = {
  userTokens: {} as { [key: string]: ITokenObject[] }
}

export function isWalletConnected() {
  const wallet = Wallet.getClientInstance();
  return wallet.isConnected;
}

export function getChainId() {
  return Wallet.getInstance().chainId;
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

export const getChainNativeToken = (chainId: number): ITokenObject => {
  return ChainNativeTokenByChainId[chainId];
}
