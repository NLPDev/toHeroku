import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { RoomeditComponent } from './roomedit.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [RoomeditComponent]
})
export class RoomeditModule {}