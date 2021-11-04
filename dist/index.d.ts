/// <reference types="node" />
import PrivateDefinePlugin from '@/plugins/define';
export * as PrivateDefinePlugin from '@/plugins/define';
export * as WarpPlugin from '@/plugins/warp';
export * as VuePrivatePlugin from '@/plugins/vue';
declare const _default: {
    PrivateDefinePlugin: typeof PrivateDefinePlugin;
    WarpPlugin: {
        wrapPrivate: (pattern?: string, value?: string[], fn?: <T>(v: T) => void) => void;
        getPrivateProperty: () => Record<string, string> | NodeJS.ProcessEnv;
    };
    VuePrivatePlugin: {
        install: (Vue: any) => void;
    };
};
export default _default;
