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
    let privateConfig = null;
    try {
        privateConfig = APP_PRIVATE_CONFIG;
    }
    catch (err) {
        privateConfig = process.env.config;
    }
    return privateConfig ? {
        enabled: privateConfig.enabled,
        independentSymbol: privateConfig.independentSymbol
    } : {
        enabled: true,
        independentSymbol: true
    };
};

const { independentSymbol: independentSymbol$1 } = generateConfig();
const privateRunServer$1 = independentSymbol$1 ? APP_PRIVATE_RUN_SERVER : process.env.run_server;
const privateData$1 = independentSymbol$1 ? APP_PRIVATE_DATA : process.env.data;
const getPrivateProperty = () => {
    return privateData$1 || {};
};
const wrapPrivate = {
    include: (value = [], fn = (v) => { }) => {
        isLegalParams(value);
        isFunction(fn);
        isLegalTarget(privateRunServer$1);
        value.includes(privateRunServer$1) && fn(getPrivateProperty());
    },
    exclude: (value = [], fn = (v) => { }) => {
        isLegalParams(value);
        isFunction(fn);
        isLegalTarget(privateRunServer$1);
        !value.includes(privateRunServer$1) && fn(getPrivateProperty());
    },
};
var WrapPlugin = { wrapPrivate, getPrivateProperty };

const { enabled, independentSymbol } = generateConfig();
const privateRunServer = independentSymbol ? APP_PRIVATE_RUN_SERVER : process.env.run_server;
const privateStatus = independentSymbol ? APP_PRIVATE_STATUS : process.env.private;
const privateData = independentSymbol ? APP_PRIVATE_DATA : process.env.data;
const VuePrivatePlugin = {
    install: (Vue) => {
        const globalPrototype = Vue.version.slice(0, 2) === '3.' ? Vue.config.globalProperties : Vue.prototype;
        globalPrototype.$privateConfig = { enabled, independentSymbol, target: privateRunServer };
        Vue.directive('private', {
            inserted: (el, binding) => {
                if (!enabled) {
                    return;
                }
                isLegalTarget(privateRunServer);
                const { arg, value } = binding;
                switch (arg) {
                    case 'include': {
                        isLegalParams(value);
                        if (!value.includes(privateRunServer)) {
                            el.parentNode && el.parentNode.removeChild(el);
                        }
                        break;
                    }
                    case 'exclude': {
                        isLegalParams(value);
                        if (value.includes(privateRunServer)) {
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
                    return privateStatus;
                },
                privateRunServer() {
                    return privateRunServer;
                },
                privateData() {
                    return privateData;
                },
            },
        });
    }
};

var index = { WrapPlugin, VuePrivatePlugin };

export { index as default };
