import axios from 'utils/axios';

const useEventCard = () : useEventCardOutCome  => {
    const getUserById = async (userId: string) => {
        const { data } = await axios.get(`/users/${userId}`);
        return data;
    }  
    return {
        getUserById,
    }
}

interface useEventCardOutCome {
    getUserById: Function,
}

export default useEventCard;