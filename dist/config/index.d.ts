export interface IConfig {
    enabled: boolean;
    independentSymbol: boolean;
    targets: Record<string, Record<string, string>>;
}
export declare const PRIVATE_RUN_SERVER: string;
export declare const PRIVATE_STATUS: boolean;
export declare const MODULE_NAME: string;
export declare const GLOBAL_KEY: string;
export declare const loadConfig: () => IConfig;
