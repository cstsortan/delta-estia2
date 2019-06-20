import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ForumComponent } from './forum.component';
import { CommonModule } from '@angular/common';

import './index';

@NgModule({
    declarations: [
        ForumComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: ForumComponent,
            },
        ]),
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class ForumModule {
}