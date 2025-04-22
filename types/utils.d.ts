import { ITokenObject } from './interface';
export declare const state: {
    userTokens: {
        [key: string]: ITokenObject[];
    };
};
export declare const setUserTokens: (token: ITokenObject, chainId: number) => void;
export declare const hasUserToken: (address: string, chainId: number) => boolean;
export declare const getUserTokens: (chainId: number) => any[] | null;
export declare const addUserTokens: (chainId: number, token: ITokenObject) => void;
export declare const getChainNativeToken: (chainId: number) => ITokenObject;
