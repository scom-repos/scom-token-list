import {} from '@ijstech/eth-contract';
import { TokenStore } from './token';
import {
  hasUserToken,
  setUserTokens,
  addUserTokens
} from './utils';
import {
  DefaultERC20Tokens,
  ChainNativeTokenByChainId,
  DefaultTokens,
  DefaultTokensByNetworkCode as DefaultEvmTokensByNetworkCode,
  WETHByChainId,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference
} from './evmTokens/index';
import { DefaultTokensByNetworkCode as DefaultTonTokensByNetworkCode } from './tonTokens/index';
import assets from './assets';
import { ITokenObject } from './interface';

const DefaultTokensByNetworkCode = {
  ...DefaultEvmTokensByNetworkCode,
  ...DefaultTonTokensByNetworkCode
};

let tokenStore: TokenStore = new TokenStore(DefaultTokensByNetworkCode);
const setTokenStore = () => tokenStore = new TokenStore(DefaultTokensByNetworkCode);

export {
  ITokenObject,
  hasUserToken,
  setUserTokens,
  addUserTokens,
  DefaultERC20Tokens,
  ChainNativeTokenByChainId,
  tokenStore,
  setTokenStore,
  assets,
  DefaultTokens,
  DefaultTokensByNetworkCode,
  WETHByChainId,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference
}
