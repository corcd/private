export interface IConfig {
    enabled: boolean;
    independentSymbol: boolean;
    env: Array<{
        name: string;
        cmd: Array<string>;
        options: Record<string, string | number> | undefined;
    }>;
    common: Record<string, string | number> | undefined;
    targets: Record<string, Record<string, string>>;
}
export interface IConfigFromCI {
    [x: string]: string | number;
}
export declare const loadConfigFromCI: () => IConfigFromCI | null;
export declare const loadConfig: () => IConfig;
