/// <amd-module name="@scom/scom-token-list/interface.ts" />
declare module "@scom/scom-token-list/interface.ts" {
    export interface ITokenObject {
        address?: string;
        name: string;
        decimals: number;
        symbol: string;
        status?: boolean | null;
        logoURI?: string;
        isCommon?: boolean | null;
        balance?: string | number;
        isNative?: boolean | null;
        isWETH?: boolean | null;
        isNew?: boolean | null;
    }
    export type TokenMapType = {
        [token: string]: ITokenObject;
    };
    export enum SITE_ENV {
        DEV = "dev",
        TESTNET = "testnet",
        MAINNET = "mainnet"
    }
}
/// <amd-module name="@scom/scom-token-list/tokens/mainnet/avalanche.ts" />
declare module "@scom/scom-token-list/tokens/mainnet/avalanche.ts" {
    export const Tokens_Avalanche: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/mainnet/ethereum.ts" />
declare module "@scom/scom-token-list/tokens/mainnet/ethereum.ts" {
    export const Tokens_Ethereuem: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/mainnet/polygon.ts" />
declare module "@scom/scom-token-list/tokens/mainnet/polygon.ts" {
    export const Tokens_Polygon: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/mainnet/bsc.ts" />
declare module "@scom/scom-token-list/tokens/mainnet/bsc.ts" {
    export const Tokens_BSC: ({
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        symbol: string;
        address: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/mainnet/fantom.ts" />
declare module "@scom/scom-token-list/tokens/mainnet/fantom.ts" {
    export const Tokens_Fantom: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/mainnet/cronos.ts" />
declare module "@scom/scom-token-list/tokens/mainnet/cronos.ts" {
    export const Tokens_Cronos: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/mainnet/index.ts" />
declare module "@scom/scom-token-list/tokens/mainnet/index.ts" {
    export { Tokens_Avalanche } from "@scom/scom-token-list/tokens/mainnet/avalanche.ts";
    export { Tokens_Ethereuem } from "@scom/scom-token-list/tokens/mainnet/ethereum.ts";
    export { Tokens_Polygon } from "@scom/scom-token-list/tokens/mainnet/polygon.ts";
    export { Tokens_BSC } from "@scom/scom-token-list/tokens/mainnet/bsc.ts";
    export { Tokens_Fantom } from "@scom/scom-token-list/tokens/mainnet/fantom.ts";
    export { Tokens_Cronos } from "@scom/scom-token-list/tokens/mainnet/cronos.ts";
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/bsc-testnet.ts" />
declare module "@scom/scom-token-list/tokens/testnet/bsc-testnet.ts" {
    export const Tokens_BSC_Testnet: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/fuji.ts" />
declare module "@scom/scom-token-list/tokens/testnet/fuji.ts" {
    export const Tokens_Fuji: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/mumbai.ts" />
declare module "@scom/scom-token-list/tokens/testnet/mumbai.ts" {
    export const Tokens_Mumbai: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/fantom-testnet.ts" />
declare module "@scom/scom-token-list/tokens/testnet/fantom-testnet.ts" {
    export const Tokens_Fantom_Testnet: ({
        address: string;
        decimals: number;
        name: string;
        symbol: string;
        isWETH: boolean;
        isCommon?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/amino.ts" />
declare module "@scom/scom-token-list/tokens/testnet/amino.ts" {
    export const Tokens_Amino: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon?: undefined;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/aminoX-testnet.ts" />
declare module "@scom/scom-token-list/tokens/testnet/aminoX-testnet.ts" {
    export const Tokens_AminoXTestnet: ({
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/cronos-testnet.ts" />
declare module "@scom/scom-token-list/tokens/testnet/cronos-testnet.ts" {
    export const Tokens_Cronos_Testnet: ({
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH: boolean;
    } | {
        name: string;
        address: string;
        symbol: string;
        decimals: number;
        isCommon: boolean;
        isWETH?: undefined;
    })[];
}
/// <amd-module name="@scom/scom-token-list/tokens/testnet/index.ts" />
declare module "@scom/scom-token-list/tokens/testnet/index.ts" {
    export { Tokens_BSC_Testnet } from "@scom/scom-token-list/tokens/testnet/bsc-testnet.ts";
    export { Tokens_Fuji } from "@scom/scom-token-list/tokens/testnet/fuji.ts";
    export { Tokens_Mumbai } from "@scom/scom-token-list/tokens/testnet/mumbai.ts";
    export { Tokens_Fantom_Testnet } from "@scom/scom-token-list/tokens/testnet/fantom-testnet.ts";
    export { Tokens_Amino } from "@scom/scom-token-list/tokens/testnet/amino.ts";
    export { Tokens_AminoXTestnet } from "@scom/scom-token-list/tokens/testnet/aminoX-testnet.ts";
    export { Tokens_Cronos_Testnet } from "@scom/scom-token-list/tokens/testnet/cronos-testnet.ts";
}
/// <amd-module name="@scom/scom-token-list/tokens/index.ts" />
declare module "@scom/scom-token-list/tokens/index.ts" {
    import { ITokenObject } from "@scom/scom-token-list/interface.ts";
    const DefaultERC20Tokens: {
        [chainId: number]: ITokenObject[];
    };
    const ChainNativeTokenByChainId: {
        [chainId: number]: ITokenObject;
    };
    const WETHByChainId: {
        [chainId: number]: ITokenObject;
    };
    const getOpenSwapToken: (chainId: number) => ITokenObject;
    const DefaultTokens: {
        [chainId: number]: ITokenObject[];
    };
    const ToUSDPriceFeedAddressesMap: {
        [chainId: number]: {
            [token: string]: string;
        };
    };
    const tokenPriceAMMReference: {
        [chainId: number]: {
            [token: string]: string;
        };
    };
    export { DefaultERC20Tokens, ChainNativeTokenByChainId, WETHByChainId, DefaultTokens, ToUSDPriceFeedAddressesMap, tokenPriceAMMReference, getOpenSwapToken };
}
/// <amd-module name="@scom/scom-token-list/utils.ts" />
declare module "@scom/scom-token-list/utils.ts" {
    import { ITokenObject } from "@scom/scom-token-list/interface.ts";
    export enum WalletPlugin {
        MetaMask = "metamask",
        WalletConnect = "walletconnect"
    }
    export const state: {
        userTokens: {
            [key: string]: ITokenObject[];
        };
    };
    export function isWalletConnected(): boolean;
    export function getChainId(): number;
    export const hasMetaMask: () => boolean;
    export const setUserTokens: (token: ITokenObject, chainId: number) => void;
    export const hasUserToken: (address: string, chainId: number) => boolean;
    export const getUserTokens: (chainId: number) => any[] | null;
    export const addUserTokens: (token: ITokenObject) => void;
    export const getChainNativeToken: (chainId: number) => ITokenObject;
}
/// <amd-module name="@scom/scom-token-list/token.ts" />
declare module "@scom/scom-token-list/token.ts" {
    import { ITokenObject, TokenMapType } from "@scom/scom-token-list/interface.ts";
    export type DefaultTokensByChainType = Record<number, ITokenObject[]>;
    export type TokenBalancesType = Record<string, string>;
    export class TokenStore {
        private _defaultTokensByChain;
        private _tokenBalances;
        private _tokenMap;
        constructor(defaultTokensByChain: DefaultTokensByChainType);
        get tokenBalances(): TokenBalancesType;
        get tokenMap(): TokenMapType;
        getTokenList(chainId: number): ITokenObject[];
        private getERC20Balance;
        getTokenBalance(token: ITokenObject): string;
        private _updateAllTokenBalances;
        updateAllTokenBalances(): Promise<TokenBalancesType>;
        updateTokenBalances(erc20TokenList: ITokenObject[]): Promise<TokenBalancesType>;
        private _updateTokenMapData;
        updateTokenMapData(): TokenMapType;
    }
}
/// <amd-module name="@scom/scom-token-list/assets.ts" />
declare module "@scom/scom-token-list/assets.ts" {
    import { ITokenObject } from "@scom/scom-token-list/interface.ts";
    function fullPath(path: string): string;
    function tokenPath(tokenObj?: ITokenObject, chainId?: number): string;
    const _default: {
        fullPath: typeof fullPath;
        tokenPath: typeof tokenPath;
        fallbackUrl: string;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-token-list" />
declare module "@scom/scom-token-list" {
    import { TokenStore } from "@scom/scom-token-list/token.ts";
    import { hasMetaMask, hasUserToken, setUserTokens, getChainId, isWalletConnected, addUserTokens } from "@scom/scom-token-list/utils.ts";
    import { DefaultERC20Tokens, ChainNativeTokenByChainId } from "@scom/scom-token-list/tokens/index.ts";
    import assets from "@scom/scom-token-list/assets.ts";
    let tokenStore: TokenStore;
    const setTokenStore: () => TokenStore;
    export { hasMetaMask, hasUserToken, setUserTokens, addUserTokens, getChainId, isWalletConnected, DefaultERC20Tokens, ChainNativeTokenByChainId, tokenStore, setTokenStore, assets };
}
