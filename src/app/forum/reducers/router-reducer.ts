import { ActionType, getType } from 'typesafe-actions';
import * as routerActions from '../actions/router-actions';
import { Route, routes } from '../routes';
import { Tag } from '../interfaces/tag';

const initialState: Route = {
    tag: routes[0],
};

export type RouterAction = ActionType<typeof routerActions>;

export function routerReducer(state = initialState, action: RouterAction): Route { 
    switch(action.type) {
        case getType(routerActions.navigate):
            if((action.payload as any).name !== undefined) {
                // Someone sent a Tag here!!
                switch(action.payload) {
                    case routes[0] || routes[1] || routes[2]: 
                        return {tag: action.payload};
                    
                    default:
                        return {
                            tag: action.payload as Tag,
                            param: (action.payload as Tag).id
                        };
                }
            } else {
                // probably something like "new-post"
                // so I better set a routerName
                return {
                    routeName: action.payload as string
                }
            }
        case getType(routerActions.openPost): 
            return {
                routeName: 'post-page',
                param: action.payload.id,
            };
        default:
            return state;
    }
}