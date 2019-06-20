import { getType } from "typesafe-actions";
import { navigate } from "../../actions/router-actions";
import { routes } from "../../routes";
import { queryAllDiscussions, queryTag } from "../../actions/posts-list-actions";
import { Tag } from "../../interfaces/tag";
import { MiddlewareAPI, Dispatch } from "redux";
import { RouterAction } from "../../reducers/router-reducer";
import * as equals from 'fast-deep-equal';


export const navigateMiddleware = (api: MiddlewareAPI) => (next: Dispatch) => (action: RouterAction): any => {
    if(action.type === getType(navigate)) {
        if(equals(action.payload, routes[0])) {
            next(queryAllDiscussions());
        }
        else if(equals(action.payload, routes[1])) {
            next(action);
        } else {
            if((action.payload as Tag).id !== undefined) {
                next(queryTag((action.payload as Tag).id))
            }
        }
        
        
    }
    return next(action);
}