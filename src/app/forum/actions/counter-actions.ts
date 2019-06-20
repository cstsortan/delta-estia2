import { createStandardAction } from 'typesafe-actions';

interface CounterIdentityPayload {
    id: string;
}

export const addCounter = createStandardAction('counters/ADD')();
export const incrementCounter = createStandardAction('counter/INCREMENT')<CounterIdentityPayload>();
export const deleteCounter = createStandardAction('counters/DELETE')<CounterIdentityPayload>();