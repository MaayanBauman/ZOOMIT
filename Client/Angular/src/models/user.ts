export enum UserType{
    USER = 'user',
    ZOOMER = 'zoomer',
    ADMIN = 'admin'
}
export interface User {
    _id: string;
    full_name: string;
    email: string;
    user_type: UserType;
    favorite_categories: Array<string>;
    owned_events: Array<string>;
    photograph: string;
    approved_date: Date;
    description: string;
    is_waiting_for_approval: boolean;
    registerd_events: Array<string>;}