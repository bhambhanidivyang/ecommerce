import { createAction } from "../../../utils/reducer/reducer.utils";
import { AppUser } from "../../interface/AppUser.type";

export const setCurrentUser = (user: AppUser | null) => {
    return createAction('SET_CURRENT_USER', user);
}