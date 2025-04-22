"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainNativeToken = exports.addUserTokens = exports.getUserTokens = exports.hasUserToken = exports.setUserTokens = exports.state = void 0;
const index_1 = require("./evmTokens/index");
const TOKENS = "oswap_user_tokens_";
exports.state = {
    userTokens: {}
};
const setUserTokens = (token, chainId) => {
    if (!exports.state.userTokens[chainId]) {
        exports.state.userTokens[chainId] = [token];
    }
    else {
        exports.state.userTokens[chainId].push(token);
    }
};
exports.setUserTokens = setUserTokens;
const hasUserToken = (address, chainId) => {
    return exports.state.userTokens[chainId]?.some((token) => token.address?.toLocaleLowerCase() === address?.toLocaleLowerCase());
};
exports.hasUserToken = hasUserToken;
const getUserTokens = (chainId) => {
    let tokens = localStorage[TOKENS + chainId];
    if (tokens) {
        tokens = JSON.parse(tokens);
    }
    else {
        tokens = [];
    }
    const userTokens = exports.state.userTokens[chainId];
    if (userTokens && userTokens.length) {
        tokens = tokens.concat(userTokens);
    }
    return tokens.length ? tokens : null;
};
exports.getUserTokens = getUserTokens;
const addUserTokens = (chainId, token) => {
    let tokens = localStorage[TOKENS + chainId];
    let i = -1;
    if (tokens) {
        tokens = JSON.parse(tokens);
        i = tokens.findIndex((item) => item.address == token.address);
    }
    else {
        tokens = [];
    }
    if (i == -1) {
        tokens.push(token);
    }
    localStorage[TOKENS + chainId] = JSON.stringify(tokens);
};
exports.addUserTokens = addUserTokens;
const getChainNativeToken = (chainId) => {
    return index_1.ChainNativeTokenByChainId[chainId];
};
exports.getChainNativeToken = getChainNativeToken;
