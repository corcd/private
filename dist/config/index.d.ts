export interface IConfig {
    enabled: boolean;
    independentSymbol: boolean;
    targets: Record<string, Record<string, string>>;
}
export declare const PRIVATE_RUN_SERVER: string;
export declare const PRIVATE_STATUS: string;
export declare const PRIVATE_CONFIG: string;
export declare const PRIVATE_GLOBAL_KEY: string;
export declare const MODULE_NAME: string;
export declare const generateConfig: () => {
    enabled: any;
    independentSymbol: any;
};
export declare const loadConfig: () => IConfig;
