const isLegalTarget = (value) => {
    if (String(value).length === 0) {
        throw new Error('PRIVATE: 缺少必要的环境变量');
    }
    console.log('PRIVATE:', value);
    return true;
};
const isLegalParams = (value) => {
    if (!Array.isArray(value) || typeof value === 'string') {
        throw new Error('PRIVATE: 非法的值');
    }
    return true;
};
const isFunction = (value) => {
    if (typeof value !== 'function') {
        throw new Error('PRIVATE: 不合法的执行函数');
    }
    return true;
};

const generateConfig = () => {
    const privateConfig = APP_PRIVATE_CONFIG;
    return privateConfig ? {
        enabled: privateConfig.enabled,
        independentSymbol: privateConfig.independentSymbol
    } : {
        enabled: true,
        independentSymbol: true
    };
};

const privateRunServer$1 = APP_PRIVATE_RUN_SERVER;
const privateData$1 = APP_PRIVATE_DATA;
const { independentSymbol: independentSymbol$1 } = generateConfig();
const wrapPrivate = {
    include: (value = [], fn = (v) => { }) => {
        isLegalParams(value);
        isFunction(fn);
        const target = independentSymbol$1
            ? privateRunServer$1
            : process.env.run_server;
        const config = independentSymbol$1 ? (privateData$1 || {}) : process.env;
        isLegalTarget(target);
        value.includes(target) && fn(config);
    },
    exclude: (value = [], fn = (v) => { }) => {
        isLegalParams(value);
        isFunction(fn);
        const target = independentSymbol$1
            ? privateRunServer$1
            : process.env.run_server;
        const config = independentSymbol$1 ? (privateData$1 || {}) : process.env;
        isLegalTarget(target);
        !value.includes(target) && fn(config);
    },
};
const getPrivateProperty = () => {
    return independentSymbol$1 ? (privateData$1 || {}) : process.env;
};
var WrapPlugin = { wrapPrivate, getPrivateProperty };

const privateRunServer = APP_PRIVATE_RUN_SERVER;
const privateStatus = APP_PRIVATE_STATUS;
const privateData = APP_PRIVATE_DATA;
const { enabled, independentSymbol } = generateConfig();
const VuePrivatePlugin = {
    install: (Vue) => {
        const globalPrototype = Vue.version.slice(0, 2) === '3.' ? Vue.config.globalProperties : Vue.prototype;
        const target = independentSymbol
            ? privateRunServer
            : process.env.run_server;
        globalPrototype.$privateConfig = { enabled, independentSymbol, target };
        Vue.directive('private', {
            inserted: (el, binding) => {
                if (!enabled) {
                    return;
                }
                isLegalTarget(target);
                const { arg, value } = binding;
                switch (arg) {
                    case 'include': {
                        isLegalParams(value);
                        if (!value.includes(target)) {
                            el.parentNode && el.parentNode.removeChild(el);
                        }
                        break;
                    }
                    case 'exclude': {
                        isLegalParams(value);
                        if (value.includes(target)) {
                            el.parentNode && el.parentNode.removeChild(el);
                        }
                        break;
                    }
                }
            },
        });
        Vue.mixin({
            computed: {
                privateStatus() {
                    return independentSymbol
                        ? privateStatus
                        : process.env.private;
                },
                privateRunServer() {
                    return independentSymbol
                        ? privateRunServer
                        : process.env.run_server;
                },
                privateData() {
                    return independentSymbol
                        ? privateData
                        : process.env;
                },
            },
        });
    }
};

var index = { WrapPlugin, VuePrivatePlugin };

export { index as default };
