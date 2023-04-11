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
  CoreContractAddressesByChainId
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
  CoreContractAddressesByChainId,
  tokenStore,
  setTokenStore,
  assets
}
