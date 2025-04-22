"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTokensByNetworkCode = void 0;
const DefaultTokensByNetworkCode = {
    'TON': [
        {
            name: 'Toncoin',
            symbol: 'TON',
            decimals: 9
        },
        {
            name: 'USDT',
            symbol: 'USDT',
            decimals: 6,
            address: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'
        }
    ].map(v => ({ ...v, chainId: 0, networkCode: 'TON' })),
    'TON-TESTNET': [
        {
            name: 'Toncoin',
            symbol: 'TON',
            decimals: 9
        },
        {
            name: 'USDT',
            symbol: 'USDT',
            decimals: 6,
            address: 'kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy'
        },
        {
            name: 'tgBTC',
            symbol: 'tgBTC',
            decimals: 8,
            address: 'kQDoy1cUAbGq253vwfoPcqSloODVAWkDBniR12PJFUHnK6Yf'
        }
    ].map(v => ({ ...v, chainId: 0, networkCode: 'TON-TESTNET' })),
};
exports.DefaultTokensByNetworkCode = DefaultTokensByNetworkCode;
