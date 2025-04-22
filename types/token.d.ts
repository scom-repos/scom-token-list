import { ITokenObject, TokenMapType } from './interface';
export type DefaultTokensByNetworkCodeType = Record<string, ITokenObject[]>;
export type TokenBalancesType = Record<string, string>;
export declare class TokenStore {
    private _defaultTokensByNetworkCode;
    private _defaultTokensByChainId;
    private _tokenBalancesByChainId;
    private _tokenMapByChainId;
    constructor(defaultTokensByNetworkCode: DefaultTokensByNetworkCodeType);
    getTokenBalancesByChainId(chainId: number): TokenBalancesType;
    getTokenMapByChainId(chainId: number): TokenMapType;
    getTokenList(chainId: number): ITokenObject[];
    getTokenListByNetworkCode(networkCode: string): ITokenObject[];
    private getERC20Balance;
    private _updateAllTokenBalances;
    updateTokenBalancesByChainId(chainId: number, erc20TokenList?: ITokenObject[]): Promise<TokenBalancesType>;
    updateNativeTokenBalanceByChainId(chainId: number): Promise<void>;
    private _updateTokenMapData;
    updateTokenMapData(chainId: number): TokenMapType;
}
