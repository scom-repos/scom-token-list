import { BigNumber, Contracts, IClientWallet, IRpcWallet, IWallet, RpcWallet, Wallet } from '@ijstech/eth-wallet';
import { ITokenObject, TokenMapType } from './interface';
import { getChainNativeToken, getUserTokens } from './utils';

export type DefaultTokensByChainType = Record<number, ITokenObject[]>;

export type TokenBalancesType = Record<string, string>;

export class TokenStore {
  private _defaultTokensByChain: DefaultTokensByChainType;
  // private _tokenBalances: TokenBalancesType = {}; //FIXME: To be removed
  private _tokenBalancesByChainId: Record<number, TokenBalancesType> = {};
  // private _tokenMap: TokenMapType = {}; //FIXME: To be removed
  private _tokenMapByChainId: Record<number, TokenMapType> = {};
  // private _promiseMap: Record<string, Promise<any>> = {};

  constructor(defaultTokensByChain: DefaultTokensByChainType) {
    this._defaultTokensByChain = defaultTokensByChain;
  }

  //FIXME: To be removed
  // public get tokenBalances() {
  //   return this._tokenBalances;
  // }

  //FIXME: To be removed
  // public get tokenMap() { 
  //   return this._tokenMap;
  // }

  public getTokenBalancesByChainId(chainId: number) {
    return this._tokenBalancesByChainId[chainId];
  }

  public getTokenMapByChainId(chainId: number) {
    return this._tokenMapByChainId[chainId];
  }

  public getTokenList(chainId: number) {
    const tokenList:ITokenObject[] = [];
    if (!chainId) return tokenList;

    if (this._defaultTokensByChain && this._defaultTokensByChain[chainId]){
      tokenList.push(...this._defaultTokensByChain[chainId]);
    }
    const userCustomTokens = getUserTokens(chainId);
    if (userCustomTokens) {
      userCustomTokens.forEach(v => tokenList.push({...v, isNew: false, isCustom: true}));
    }
    return tokenList;
  }

  private async getERC20Balance(wallet: IWallet, token: string) {
    const erc20 = new Contracts.ERC20(wallet, token);
    const balance = await erc20.balanceOf(wallet.address);
    return balance;
  }

  // public getTokenBalance(token: ITokenObject): string {
  //   let balance = '0';
  //   if (!token || !this._tokenBalances) return balance;
  //   if (token.address) {
  //     balance = this._tokenBalances[token.address.toLowerCase()];
  //   } else {
  //     balance = this._tokenBalances[token.symbol];
  //   }
  //   return balance;
  // }

  private async _updateAllTokenBalances(wallet: IRpcWallet, erc20TokenList: ITokenObject[], nativeToken: ITokenObject): Promise<TokenBalancesType> {
    let allTokenBalancesMap: TokenBalancesType = {};
    try {
      const erc20 = new Contracts.ERC20(wallet);
      await wallet.init(); //FIXME: this is a workaround until encodeFunctionCall gets rid of web3.js
      const data = wallet.encodeFunctionCall(erc20, 'balanceOf', [wallet.address]);
      const result = await wallet.multiCall(erc20TokenList.map((v: any) => {
        return {
          to: v.address,
          data
        }
      }))
      if (result) {
        for (let i = 0; i < erc20TokenList.length; i++) {
          const token = erc20TokenList[i];
          if (token.address) { 
            allTokenBalancesMap[token.address.toLowerCase()] = new BigNumber(result.results[i]).shiftedBy(-token.decimals).toFixed()
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

  //FIXME: To be removed
  // public async updateAllTokenBalances(wallet: IRpcWallet): Promise<TokenBalancesType> {
  //   let allTokenBalancesMap: TokenBalancesType = {};
  //   if (this._promiseMap[wallet.instanceId]) {
  //     return this._promiseMap[wallet.instanceId];
  //   }
  //   let promise = new Promise<TokenBalancesType>(async (resolve, reject) => {
  //     try {
  //       const tokenList = this.getTokenList(wallet.chainId);
  //       if (!wallet.chainId || !tokenList) return allTokenBalancesMap;
  //       const nativeToken: any = tokenList.find(v => !v.address);
  //       const erc20TokenList = tokenList.filter(v => !!v.address);
  //       allTokenBalancesMap = await this._updateAllTokenBalances(wallet, erc20TokenList, nativeToken);
  //       this._tokenBalances = allTokenBalancesMap;
  //       this._tokenBalancesByChainId[wallet.chainId] = allTokenBalancesMap;
  //       this._promiseMap[wallet.instanceId] = null;
  //       resolve(allTokenBalancesMap);
  //     } catch (error) {
  //       this._promiseMap[wallet.instanceId] = null;
  //       reject(error);
  //     }
  //   })
  //   this._promiseMap[wallet.instanceId] = promise;
  //   return promise;
  // }

  //FIXME: To be removed
  // public async updateTokenBalances(wallet: IRpcWallet, erc20TokenList: ITokenObject[]): Promise<TokenBalancesType> {
  //   let tokenBalancesMap: TokenBalancesType = {};
  //   if (!wallet.chainId) return tokenBalancesMap;
  //   const nativeToken = getChainNativeToken(wallet.chainId);
  //   tokenBalancesMap = await this._updateAllTokenBalances(wallet, erc20TokenList, nativeToken);
  //   for (let tokenAddress of Object.keys(tokenBalancesMap)) {
  //     this._tokenBalances[tokenAddress] = tokenBalancesMap[tokenAddress];
  //   }
  //   this._tokenBalancesByChainId[wallet.chainId] = this._tokenBalances;
  //   return this._tokenBalances;
  // }

  private _updateTokenMapData(chainId: number): TokenMapType {
    let allTokensMap: TokenMapType = {};
    if (this._defaultTokensByChain[chainId]) {
      let defaultTokenList = this._defaultTokensByChain[chainId].sort((a, b) => {
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
    // this._tokenMap = allTokensMap;
    this._tokenMapByChainId[chainId] = allTokensMap;
    return allTokensMap;
  }
}
