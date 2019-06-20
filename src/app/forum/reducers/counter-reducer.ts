import { ActionType, getType } from 'typesafe-actions';
import * as counterActions from '../actions/counter-actions';

import * as cuid from 'cuid';

export type CounterAction = ActionType<typeof counterActions>;

export class Counter {
    id: string;
    counter: number;

    constructor() {
        this.id = cuid();
        this.counter = 0;
    }
}

export class CountersState {
    counters: Counter[];
    globalCounter: number;

    constructor() {
        this.counters = [];
        this.globalCounter = 0;
    }
}

export function countersReducer(state = new CountersState(), action: CounterAction): CountersState {
    switch (action.type) {
        case getType(counterActions.addCounter):
            const newCounter = new Counter()
            return {
                ...state,
                counters: [...state.counters, newCounter],
                globalCounter: state.globalCounter + newCounter.counter,
            };
        case getType(counterActions.incrementCounter):
            return {
                ...state,
                counters: state.counters.map<Counter>(counter => {
                        if(counter.id === action.payload.id) {
                            return {
                                ...counter,
                                counter: counter.counter + 1,
                            };
                        } else {
                            return counter;
                        }
                }),
                globalCounter: state.globalCounter + 1,
            };
        case getType(counterActions.deleteCounter):
            return {
                ...state,
                counters: state.counters.filter(counter => {
                    return counter.id !== action.payload.id;
                }),
                globalCounter: state.globalCounter - (state.counters.find(counter => counter.id === action.payload.id)!.counter || 0)
            };
        default:
            return state;
    }
} 