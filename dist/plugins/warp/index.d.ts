/// <reference types="node" />
declare const _default: {
    wrapPrivate: (pattern?: string, value?: string[], fn?: <T>(v: T) => void) => void;
    getPrivateProperty: () => Record<string, string> | NodeJS.ProcessEnv;
};
export default _default;
