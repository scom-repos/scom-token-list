"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenStore = void 0;
const eth_wallet_1 = require("@ijstech/eth-wallet");
const utils_1 = require("./utils");
class TokenStore {
    constructor(defaultTokensByNetworkCode) {
        this._defaultTokensByChainId = {};
        this._tokenBalancesByChainId = {};
        this._tokenMapByChainId = {};
        this._defaultTokensByNetworkCode = defaultTokensByNetworkCode;
        this._defaultTokensByChainId = {};
        for (let networkCode in defaultTokensByNetworkCode) {
            let chainId = defaultTokensByNetworkCode[networkCode][0]?.chainId;
            this._defaultTokensByChainId[chainId] = defaultTokensByNetworkCode[networkCode];
        }
    }
    getTokenBalancesByChainId(chainId) {
        return this._tokenBalancesByChainId[chainId];
    }
    getTokenMapByChainId(chainId) {
        return this._tokenMapByChainId[chainId];
    }
    getTokenList(chainId) {
        const tokenList = [];
        if (!chainId)
            return tokenList;
        if (this._defaultTokensByChainId && this._defaultTokensByChainId[chainId]) {
            tokenList.push(...this._defaultTokensByChainId[chainId]);
        }
        const userCustomTokens = (0, utils_1.getUserTokens)(chainId);
        if (userCustomTokens) {
            userCustomTokens.forEach(v => tokenList.push({ ...v, isNew: false, isCustom: true }));
        }
        return tokenList;
    }
    getTokenListByNetworkCode(networkCode) {
        return this._defaultTokensByNetworkCode[networkCode];
    }
    async getERC20Balance(wallet, token) {
        const erc20 = new eth_wallet_1.Contracts.ERC20(wallet, token);
        const balance = await erc20.balanceOf(wallet.address);
        return balance;
    }
    async _updateAllTokenBalances(wallet, erc20TokenList, nativeToken) {
        let allTokenBalancesMap = {};
        try {
            const erc20 = new eth_wallet_1.Contracts.ERC20(wallet);
            await wallet.init();
            const data = wallet.encodeFunctionCall(erc20, 'balanceOf', [wallet.address]);
            const result = await wallet.multiCall(erc20TokenList.map((v) => {
                return {
                    to: v.address,
                    data
                };
            }));
            if (result) {
                for (let i = 0; i < erc20TokenList.length; i++) {
                    const token = erc20TokenList[i];
                    if (token.address) {
                        allTokenBalancesMap[token.address.toLowerCase()] = new eth_wallet_1.BigNumber(result.results[i]).shiftedBy(-token.decimals).toFixed();
                    }
                }
                let balance = (await wallet.balance).toFixed();
                allTokenBalancesMap[nativeToken.symbol] = balance;
            }
            else {
                let promises = [];
                const tokenList = [...erc20TokenList, nativeToken];
                promises.push(...tokenList.map(async (token, index) => {
                    try {
                        if (token.address) {
                            let balance = await this.getERC20Balance(wallet, token.address);
                            allTokenBalancesMap[token.address.toLowerCase()] = new eth_wallet_1.BigNumber(balance).shiftedBy(-token.decimals).toFixed();
                        }
                        else {
                            let balance = await wallet.balance;
                            allTokenBalancesMap[token.symbol] = balance.toFixed();
                        }
                    }
                    catch (error) { }
                }));
                await Promise.all(promises);
            }
        }
        catch (error) { }
        return allTokenBalancesMap;
    }
    async updateTokenBalancesByChainId(chainId, erc20TokenList) {
        let allTokenBalancesMap = {};
        try {
            const rpcWallet = eth_wallet_1.RpcWallet.getRpcWallet(chainId);
            const tokenList = this.getTokenList(rpcWallet.chainId);
            if (!tokenList)
                return allTokenBalancesMap;
            const nativeToken = tokenList.find(v => !v.address);
            const _erc20TokenList = erc20TokenList ? erc20TokenList : tokenList.filter(v => !!v.address);
            allTokenBalancesMap = await this._updateAllTokenBalances(rpcWallet, _erc20TokenList, nativeToken);
            this._tokenBalancesByChainId[rpcWallet.chainId] = allTokenBalancesMap;
        }
        catch (error) {
        }
        return allTokenBalancesMap;
    }
    async updateNativeTokenBalanceByChainId(chainId) {
        try {
            const rpcWallet = eth_wallet_1.RpcWallet.getRpcWallet(chainId);
            const tokenList = this.getTokenList(rpcWallet.chainId);
            if (!tokenList)
                return;
            const nativeToken = tokenList.find(v => !v.address);
            let balance = (await rpcWallet.balance).toFixed();
            this._tokenBalancesByChainId[rpcWallet.chainId] = this._tokenBalancesByChainId[rpcWallet.chainId] || {};
            this._tokenBalancesByChainId[rpcWallet.chainId][nativeToken.symbol] = balance;
        }
        catch (error) {
        }
    }
    _updateTokenMapData(chainId) {
        let allTokensMap = {};
        if (this._defaultTokensByChainId[chainId]) {
            let defaultTokenList = this._defaultTokensByChainId[chainId].sort((a, b) => {
                if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) {
                    return -1;
                }
                if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
            for (let i = 0; i < defaultTokenList.length; i++) {
                let defaultTokenItem = defaultTokenList[i];
                if (defaultTokenItem.address)
                    allTokensMap[defaultTokenItem.address.toLowerCase()] = defaultTokenItem;
                else
                    allTokensMap[defaultTokenItem.symbol] = defaultTokenItem;
            }
            const userCustomTokens = (0, utils_1.getUserTokens)(chainId);
            if (userCustomTokens) {
                userCustomTokens.forEach(v => allTokensMap[v.address.toLowerCase()] = { ...v, isCustom: true });
            }
        }
        return allTokensMap;
    }
    updateTokenMapData(chainId) {
        let allTokensMap = this._updateTokenMapData(chainId);
        this._tokenMapByChainId[chainId] = allTokensMap;
        return allTokensMap;
    }
}
exports.TokenStore = TokenStore;
