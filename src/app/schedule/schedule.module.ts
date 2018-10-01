import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { ScheduleComponent } from './schedule.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [ScheduleComponent]
})
export class ScheduleModule {}