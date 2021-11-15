export interface IConfig {
    enabled: boolean;
    independentSymbol: boolean;
    common: Record<string, string | number> | undefined;
    targets: Record<string, Record<string, string>>;
}
export declare const loadConfig: () => IConfig;
