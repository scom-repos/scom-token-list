import { ITokenObject } from './interface';
import { ChainNativeTokenByChainId } from './evmTokens/index';

const TOKENS = "oswap_user_tokens_";

export const state = {
  userTokens: {} as { [key: string]: ITokenObject[] }
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
  let tokens = typeof window !== 'undefined' ? localStorage[TOKENS + chainId] : null;
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

export const addUserTokens = (chainId: number, token: ITokenObject) => {
  let tokens = typeof window !== 'undefined' ? localStorage[TOKENS + chainId] : null;
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
  if (typeof window !== 'undefined') {
    localStorage[TOKENS + chainId] = JSON.stringify(tokens);
  }
}

export const getChainNativeToken = (chainId: number): ITokenObject => {
  return ChainNativeTokenByChainId[chainId];
}
