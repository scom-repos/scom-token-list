import {} from '@ijstech/eth-contract';
import { TokenStore } from './token';
import {
  hasMetaMask,
  hasUserToken,
  setUserTokens,
  getChainId,
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

let tokenStore: TokenStore = new TokenStore(DefaultTokens);
const setTokenStore = () => tokenStore = new TokenStore(DefaultTokens);

export {
  hasMetaMask,
  hasUserToken,
  setUserTokens,
  addUserTokens,
  getChainId,
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
