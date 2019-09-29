import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'timeago.js';
import * as firebase from 'firebase/app';

@Pipe({name: 'timeago'})
export class TimeAgoPipe implements PipeTransform {
    transform(value: Date|number|firebase.firestore.Timestamp): string {
        return format(value instanceof firebase.firestore.Timestamp ? value.toDate() : value);
    }
}