import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { PeriodComponent } from './period.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [PeriodComponent]
})
export class PeriodModule {}