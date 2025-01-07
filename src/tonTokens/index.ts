import { ITokenObject } from "../interface";
const DefaultTokensByNetworkCode: Record<string, ITokenObject[]> = {
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
}

export {
    DefaultTokensByNetworkCode
}