import { TokenStore } from './token';
import { hasUserToken, setUserTokens, addUserTokens } from './utils';
import { DefaultERC20Tokens, ChainNativeTokenByChainId, DefaultTokens, WETHByChainId, ToUSDPriceFeedAddressesMap, tokenPriceAMMReference } from './evmTokens/index';
import assets from './assets';
import { ITokenObject } from './interface';
declare const DefaultTokensByNetworkCode: {
    [x: string]: ITokenObject[];
};
declare let tokenStore: TokenStore;
declare const setTokenStore: () => TokenStore;
export { ITokenObject, hasUserToken, setUserTokens, addUserTokens, DefaultERC20Tokens, ChainNativeTokenByChainId, tokenStore, setTokenStore, assets, DefaultTokens, DefaultTokensByNetworkCode, WETHByChainId, ToUSDPriceFeedAddressesMap, tokenPriceAMMReference };
