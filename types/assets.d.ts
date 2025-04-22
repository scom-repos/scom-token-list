import { ITokenObject } from './interface';
declare function fullPath(path: string): string;
declare function tokenPath(tokenObj?: ITokenObject, chainId?: number): string;
declare const _default: {
    fullPath: typeof fullPath;
    tokenPath: typeof tokenPath;
    getTokenIconPath: (tokenObj?: ITokenObject, chainId?: number) => string;
    fallbackUrl: string;
};
export default _default;
