import { AppUser } from "../interfaces/app-user";
import { ActionType, getType } from "typesafe-actions";
import * as authActions from '../actions/auth-actions';
export type AuthAction = ActionType<typeof authActions>
export function authReducer(state: AppUser | null = null, action: AuthAction): AppUser|null {
    switch(action.type) {
        case getType(authActions.updateAuthState):
            return action.payload;
        default: return state;
    }
}