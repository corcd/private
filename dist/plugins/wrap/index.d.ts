export declare const wrapPrivate: {
    include: (value?: string[], fn?: <T>(v: T) => void) => void;
    exclude: (value?: string[], fn?: <T_1>(v: T_1) => void) => void;
};
export declare const getPrivateProperty: () => any;
declare const _default: {
    wrapPrivate: {
        include: (value?: string[], fn?: <T>(v: T) => void) => void;
        exclude: (value?: string[], fn?: <T_1>(v: T_1) => void) => void;
    };
    getPrivateProperty: () => any;
};
export default _default;
