export interface IUserCreateAccount {
    'id'?: number;
    'name': string;
    'document': string;
    'initialPassword': string;
}

export interface IUserLogin {
    'document'?: string;
    'password'?: string;
}