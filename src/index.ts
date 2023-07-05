import {} from '@ijstech/eth-contract';
import { TokenStore } from './token';
import {
  hasMetaMask,
  hasUserToken,
  setUserTokens,
  isWalletConnected,
  addUserTokens
} from './utils';
import {
  DefaultERC20Tokens,
  ChainNativeTokenByChainId,
  DefaultTokens,
  WETHByChainId,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference
} from './tokens/index';
import assets from './assets';
import { ITokenObject } from './interface';

let tokenStore: TokenStore = new TokenStore(DefaultTokens);
const setTokenStore = () => tokenStore = new TokenStore(DefaultTokens);

export {
  ITokenObject,
  hasMetaMask,
  hasUserToken,
  setUserTokens,
  addUserTokens,
  isWalletConnected,
  DefaultERC20Tokens,
  ChainNativeTokenByChainId,
  tokenStore,
  setTokenStore,
  assets,
  DefaultTokens,
  WETHByChainId,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference
}
