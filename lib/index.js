"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenPriceAMMReference = exports.ToUSDPriceFeedAddressesMap = exports.WETHByChainId = exports.DefaultTokensByNetworkCode = exports.DefaultTokens = exports.assets = exports.setTokenStore = exports.tokenStore = exports.ChainNativeTokenByChainId = exports.DefaultERC20Tokens = exports.addUserTokens = exports.setUserTokens = exports.hasUserToken = void 0;
const token_1 = require("./token");
const utils_1 = require("./utils");
Object.defineProperty(exports, "hasUserToken", { enumerable: true, get: function () { return utils_1.hasUserToken; } });
Object.defineProperty(exports, "setUserTokens", { enumerable: true, get: function () { return utils_1.setUserTokens; } });
Object.defineProperty(exports, "addUserTokens", { enumerable: true, get: function () { return utils_1.addUserTokens; } });
const index_1 = require("./evmTokens/index");
Object.defineProperty(exports, "DefaultERC20Tokens", { enumerable: true, get: function () { return index_1.DefaultERC20Tokens; } });
Object.defineProperty(exports, "ChainNativeTokenByChainId", { enumerable: true, get: function () { return index_1.ChainNativeTokenByChainId; } });
Object.defineProperty(exports, "DefaultTokens", { enumerable: true, get: function () { return index_1.DefaultTokens; } });
Object.defineProperty(exports, "WETHByChainId", { enumerable: true, get: function () { return index_1.WETHByChainId; } });
Object.defineProperty(exports, "ToUSDPriceFeedAddressesMap", { enumerable: true, get: function () { return index_1.ToUSDPriceFeedAddressesMap; } });
Object.defineProperty(exports, "tokenPriceAMMReference", { enumerable: true, get: function () { return index_1.tokenPriceAMMReference; } });
const index_2 = require("./tonTokens/index");
const assets_1 = __importDefault(require("./assets"));
exports.assets = assets_1.default;
const DefaultTokensByNetworkCode = {
    ...index_1.DefaultTokensByNetworkCode,
    ...index_2.DefaultTokensByNetworkCode
};
exports.DefaultTokensByNetworkCode = DefaultTokensByNetworkCode;
let tokenStore = new token_1.TokenStore(DefaultTokensByNetworkCode);
exports.tokenStore = tokenStore;
const setTokenStore = () => exports.tokenStore = tokenStore = new token_1.TokenStore(DefaultTokensByNetworkCode);
exports.setTokenStore = setTokenStore;
