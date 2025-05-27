import { BigNumber, Contracts, IClientWallet, IRpcWallet, IWallet, RpcWallet, Wallet } from '@ijstech/eth-wallet';
import { ITokenObject, TokenMapType } from './interface';
import { getChainNativeToken, getUserTokens } from './utils';

export type DefaultTokensByNetworkCodeType = Record<string, ITokenObject[]>;
export type TokenBalancesType = Record<string, string>;

export class TokenStore {
  private _defaultTokensByNetworkCode: DefaultTokensByNetworkCodeType;
  private _defaultTokensByChainId: Record<number, ITokenObject[]> = {};
  private _tokenBalancesByChainId: Record<number, TokenBalancesType> = {};
  private _tokenMapByChainId: Record<number, TokenMapType> = {};

  constructor(defaultTokensByNetworkCode: DefaultTokensByNetworkCodeType) {
    this._defaultTokensByNetworkCode = defaultTokensByNetworkCode;
    this._defaultTokensByChainId = {};
    for (let networkCode in defaultTokensByNetworkCode) {
      let chainId = defaultTokensByNetworkCode[networkCode][0]?.chainId;
      this._defaultTokensByChainId[chainId] = defaultTokensByNetworkCode[networkCode];
    }
  }

  public getTokenBalancesByChainId(chainId: number) {
    return this._tokenBalancesByChainId[chainId];
  }

  public getTokenMapByChainId(chainId: number) {
    return this._tokenMapByChainId[chainId];
  }

  public getTokenList(chainId: number) {
    const tokenList:ITokenObject[] = [];
    if (!chainId) return tokenList;

    if (this._defaultTokensByChainId && this._defaultTokensByChainId[chainId]){
      tokenList.push(...this._defaultTokensByChainId[chainId]);
    }
    const userCustomTokens = getUserTokens(chainId);
    if (userCustomTokens) {
      userCustomTokens.forEach(v => tokenList.push({...v, isNew: false, isCustom: true}));
    }
    return tokenList;
  }

  public getTokenListByNetworkCode(networkCode: string) {
    return this._defaultTokensByNetworkCode[networkCode];
  }

  private async getERC20Balance(wallet: IWallet, token: string) {
    const erc20 = new Contracts.ERC20(wallet, token);
    const balance = await erc20.balanceOf(wallet.address);
    return balance;
  }

  private async _updateAllTokenBalances(wallet: IRpcWallet, erc20TokenList: ITokenObject[], nativeToken: ITokenObject): Promise<TokenBalancesType> {
    let allTokenBalancesMap: TokenBalancesType = {};
    try {
      const erc20 = new Contracts.ERC20(wallet);
      await wallet.init(); //FIXME: this is a workaround until encodeFunctionCall gets rid of web3.js
      const results = await wallet.doMulticall(erc20TokenList.map((v: any) => {
        return {
          contract: erc20,
          methodName: 'balanceOf',
          to: v.address,
          params: [wallet.address],
        }
      }))
      if (results?.length > 0) {
        for (let i = 0; i < erc20TokenList.length; i++) {
          const token = erc20TokenList[i];
          if (token.address) { 
            allTokenBalancesMap[token.address.toLowerCase()] = new BigNumber(results[i]).shiftedBy(-token.decimals).toFixed()
          }
        }
        let balance = (await wallet.balance).toFixed();
        allTokenBalancesMap[nativeToken.symbol] = balance;
      }
      else {
        let promises: Promise<void>[] = [];
        const tokenList = [...erc20TokenList, nativeToken];
        promises.push(...tokenList.map(async (token, index) => {
          try {
            if (token.address) {
              let balance = await this.getERC20Balance(wallet, token.address);
              allTokenBalancesMap[token.address.toLowerCase()] = new BigNumber(balance).shiftedBy(-token.decimals).toFixed();
            } else {
              let balance = await wallet.balance;
              allTokenBalancesMap[token.symbol] = balance.toFixed();
            }
          } catch (error) { }
        }));
        await Promise.all(promises);
      }
    } catch (error) { }
    return allTokenBalancesMap;
  }

  public async updateTokenBalancesByChainId(chainId: number, erc20TokenList?: ITokenObject[]): Promise<TokenBalancesType> {
    let allTokenBalancesMap: TokenBalancesType = {};
    try {
      const rpcWallet = RpcWallet.getRpcWallet(chainId);
      const tokenList = this.getTokenList(rpcWallet.chainId);
      if (!tokenList) return allTokenBalancesMap;
      const nativeToken: any = tokenList.find(v => !v.address);
      const _erc20TokenList = erc20TokenList ? erc20TokenList : tokenList.filter(v => !!v.address);
      allTokenBalancesMap = await this._updateAllTokenBalances(rpcWallet, _erc20TokenList, nativeToken);
      this._tokenBalancesByChainId[rpcWallet.chainId] = allTokenBalancesMap;
    } catch (error) {
    }
    return allTokenBalancesMap;
  }

  public async updateNativeTokenBalanceByChainId(chainId: number): Promise<void> {
    try {
      const rpcWallet = RpcWallet.getRpcWallet(chainId);
      const tokenList = this.getTokenList(rpcWallet.chainId);
      if (!tokenList) return;
      const nativeToken: any = tokenList.find(v => !v.address);
      let balance = (await rpcWallet.balance).toFixed();
      this._tokenBalancesByChainId[rpcWallet.chainId] = this._tokenBalancesByChainId[rpcWallet.chainId] || {};
      this._tokenBalancesByChainId[rpcWallet.chainId][nativeToken.symbol]  = balance;
    } catch (error) {
    }
  }

  private _updateTokenMapData(chainId: number): TokenMapType {
    let allTokensMap: TokenMapType = {};
    if (this._defaultTokensByChainId[chainId]) {
      let defaultTokenList = this._defaultTokensByChainId[chainId].sort((a, b) => {
        if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) { return -1; }
        if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) { return 1; }
        return 0;
      })
      for (let i = 0; i < defaultTokenList.length; i++) {
        let defaultTokenItem = defaultTokenList[i];
        if (defaultTokenItem.address)
          allTokensMap[defaultTokenItem.address.toLowerCase()] = defaultTokenItem;
        else
          allTokensMap[defaultTokenItem.symbol] = defaultTokenItem;
      }
      const userCustomTokens = getUserTokens(chainId);
      if (userCustomTokens) {
        userCustomTokens.forEach(v => allTokensMap[v.address.toLowerCase()] = {...v, isCustom: true});
      }
    }
    return allTokensMap;
  }

  public updateTokenMapData(chainId: number): TokenMapType {
    let allTokensMap = this._updateTokenMapData(chainId);
    this._tokenMapByChainId[chainId] = allTokensMap;
    return allTokensMap;
  }
}
