import { ITokenObject } from "../interface";
declare const DefaultERC20Tokens: {
    [chainId: number]: ITokenObject[];
};
declare const ChainNativeTokenByChainId: {
    [chainId: number]: ITokenObject;
};
declare const WETHByChainId: {
    [chainId: number]: ITokenObject;
};
declare const getOpenSwapToken: (chainId: number) => ITokenObject;
declare const DefaultTokens: {
    [chainId: number]: ITokenObject[];
};
declare const DefaultTokensByNetworkCode: {
    [networkCode: string]: ITokenObject[];
};
declare const ToUSDPriceFeedAddressesMap: {
    [chainId: number]: {
        [token: string]: string;
    };
};
declare const tokenPriceAMMReference: {
    [chainId: number]: {
        [token: string]: string;
    };
};
export { DefaultERC20Tokens, ChainNativeTokenByChainId, WETHByChainId, DefaultTokens, DefaultTokensByNetworkCode, ToUSDPriceFeedAddressesMap, tokenPriceAMMReference, getOpenSwapToken };
