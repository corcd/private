export declare const getPrivateProperty: () => any;
export declare const wrapPrivate: {
    include: (value?: string[], fn?: <T>(v: T) => void) => void;
    exclude: (value?: string[], fn?: <T_1>(v: T_1) => void) => void;
};
declare const _default: {
    wrapPrivate: {
        include: (value?: string[], fn?: <T>(v: T) => void) => void;
        exclude: (value?: string[], fn?: <T_1>(v: T_1) => void) => void;
    };
    getPrivateProperty: () => any;
};
export default _default;
