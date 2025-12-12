type UserPayload = {
    name: string;
    phone: string;
    role: string;
};
export declare const userServices: {
    getUser: () => Promise<import("pg").QueryResult<any>>;
    getUpdateUser: (payload: UserPayload, id: string, isAdmin: boolean) => Promise<import("pg").QueryResult<any>>;
    getDeleteUser: (id: string) => Promise<import("pg").QueryResult<any>>;
};
export {};
//# sourceMappingURL=users.service.d.ts.map