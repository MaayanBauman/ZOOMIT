import UserType from 'models/Enums/UserType';
import RegisterdEvent from 'models/Event/RegisterdEvent';

interface User {
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
    registerd_events: Array<RegisterdEvent>;
};

export default User;
