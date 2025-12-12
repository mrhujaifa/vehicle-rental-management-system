type TCreateUser = {
    name: string;
    role: "admin" | "customer";
    email: string;
    phone: string;
    password: string;
};
export declare const userServices: {
    createUser: (payload: TCreateUser) => Promise<any>;
    getUser: () => Promise<import("pg").QueryResult<any>>;
};
export {};
//# sourceMappingURL=users.service.d.ts.map