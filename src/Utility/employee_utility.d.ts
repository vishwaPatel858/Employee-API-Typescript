export declare const generateEncryptedPassword: (password: string) => Promise<string>;
export declare const validatePassword: (password: string, encryptedPass: string) => Promise<boolean>;
