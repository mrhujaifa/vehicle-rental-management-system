type TLoginUser = {
    email: string;
    password: string;
};
export declare const authSevices: {
    loginUser: (payload: TLoginUser) => Promise<false | {
        token: string;
        user: any;
    } | null>;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map