"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let moduleDir = '';
if (typeof window !== 'undefined') {
    const application = window['application'];
    moduleDir = application.currentModuleDir;
}
function fullPath(path) {
    return `${moduleDir}/${path}`;
}
const TokenFolderName = {
    1: "ethereum",
    25: "cronos",
    42: "kovan",
    56: "bsc",
    97: "bsc-testnet",
    137: "polygon",
    300: 'zk-sepolia',
    324: 'zksync',
    338: "cronos-testnet",
    31337: "amino",
    80001: "mumbai",
    43113: "fuji",
    43114: "avalanche",
    250: "fantom",
    4002: "fantom-testnet",
    13370: "aminox-testnet",
    42161: "arbitrum",
    421613: "arbitrum-goerli",
};
const CommonTokenPathMap = {
    'USDT': 'img/tokens/USDT.png',
    'TON': 'img/tokens/TON.png',
};
function tokenPath(tokenObj, chainId) {
    return fullPath(getTokenIconPath(tokenObj, chainId));
}
const getTokenIconPath = (tokenObj, chainId) => {
    const pathPrefix = 'img/tokens';
    if (tokenObj) {
        if (CommonTokenPathMap[tokenObj.symbol]) {
            return CommonTokenPathMap[tokenObj.symbol];
        }
        else if (chainId >= 0) {
            let folderName = TokenFolderName[chainId];
            let fileName = (!tokenObj.isNative ? tokenObj.address.toLowerCase() : tokenObj.symbol) + '.png';
            return `${pathPrefix}/${folderName}/${fileName}`;
        }
    }
    else {
        return `${pathPrefix}/Custom.png`;
    }
};
exports.default = {
    fullPath,
    tokenPath,
    getTokenIconPath,
    fallbackUrl: fullPath('img/tokens/Custom.png')
};
