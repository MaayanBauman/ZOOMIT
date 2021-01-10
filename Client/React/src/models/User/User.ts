import Event from '../Event/Event';
import Category from '../Category/Category';

interface User {
    id: string;
    full_name: string;
    email: string;
    user_type: string;
    favorite_categories: Array<Category>;
    owned_events: Array<Event>;
    photograph: string;
    approved_date: Date;
    description: string;
    is_waiting_for_approval: boolean;
    registerd_events: Array<Event>;
};

export default User;
