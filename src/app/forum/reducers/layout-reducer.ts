import { ActionType, getType } from 'typesafe-actions';
import * as layoutActions from '../actions/layout-actions';

export interface LayoutState {
    sheetOpen: boolean;
}

const initialState: LayoutState = {
    sheetOpen: false,
}

export type LayoutAction = ActionType<typeof layoutActions>;

export function layoutReducer(state: LayoutState = initialState, action: LayoutAction): LayoutState {
    switch(action.type) {
        case getType(layoutActions.toggleBottomSheet): 
            return {
                ...state,
                sheetOpen: !state.sheetOpen
            };
        default: return state;
    }
}