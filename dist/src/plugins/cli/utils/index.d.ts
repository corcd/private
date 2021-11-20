export declare const findPackageManager: () => Promise<string>;
export declare const runCmd: (cmd: string, args?: string[], env?: {}, cb?: (code: number) => void) => void;
