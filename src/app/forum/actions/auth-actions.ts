import { createStandardAction } from "typesafe-actions";
import { AppUser } from "../interfaces/app-user";


export const updateAuthState = createStandardAction('AUTH/state-update')<AppUser | null>();