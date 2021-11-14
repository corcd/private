declare const _default: {
    WarpPlugin: {
        wrapPrivate: (pattern?: string, value?: string[], fn?: <T>(v: T) => void) => void;
        getPrivateProperty: () => any;
    };
    VuePrivatePlugin: {
        install: (Vue: any) => void;
    };
};
export default _default;
