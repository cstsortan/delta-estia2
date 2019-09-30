import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WashersComponent } from './washers.component';

import './washers';
import { WashersRoutingModule } from './washers-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        WashersComponent
    ],
    imports: [
        CommonModule,
        WashersRoutingModule,
    ],
    exports: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WashersModule {}