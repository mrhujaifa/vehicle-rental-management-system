interface User {
    id: string;
    role: "admin" | "customer" | string;
}
interface User {
    id: string;
    role: "admin" | "customer" | string;
}
interface UpdateBookingsStatusPayload {
    bookingId: string;
    user: User;
}
export declare const bookingsServices: {
    createBookings: (payload: any) => Promise<any>;
    getBookings: (user: User) => Promise<any[]>;
    getBookingsUpdate: ({ bookingId, user, }: UpdateBookingsStatusPayload) => Promise<{
        message: string;
    }>;
};
export {};
//# sourceMappingURL=booking.service.d.ts.map