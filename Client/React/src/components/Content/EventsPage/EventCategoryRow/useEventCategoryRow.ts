import User from "models/User/User";
import { useSelector } from "react-redux";
import StoreStateType from "redux/storeStateType";
import useProfilePage from '../../ProfilePage/useProfilePage';

const useEventCategoryRow = () : useEventsPageOutCome  => {
    const user = useSelector<StoreStateType, User>(state => state.user);
    const { updateUserFavCategories } = useProfilePage();

    const addFavoriteHandler = (categoryId: string) => {
        updateUserFavCategories(user, [ ...user.favorite_categories, categoryId]);
    }

    const removeFavoriteHandler = (categoryId: string) => {
        const favCategories = user.favorite_categories.filter(faveCategoryId => faveCategoryId !== categoryId);
        updateUserFavCategories(user, favCategories);
    }

    return {
        addFavoriteHandler,
        removeFavoriteHandler
    }
}

interface useEventsPageOutCome {
    addFavoriteHandler: Function,
    removeFavoriteHandler: Function,
}

export default useEventCategoryRow;