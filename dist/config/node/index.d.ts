export interface IConfig {
    enabled: boolean;
    independentSymbol: boolean;
    targets: Record<string, Record<string, string>>;
}
export declare const loadConfig: () => IConfig;
