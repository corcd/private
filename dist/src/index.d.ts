declare const _default: {
    WrapPlugin: {
        wrapPrivate: {
            include: (value?: string[], fn?: <T>(v: T) => void) => void;
            exclude: (value?: string[], fn?: <T_1>(v: T_1) => void) => void;
        };
        getPrivateProperty: () => any;
    };
    VuePrivatePlugin: {
        install: (Vue: any) => void;
    };
};
export default _default;
