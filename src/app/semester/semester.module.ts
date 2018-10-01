import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { SemesterComponent } from './semester.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [SemesterComponent]
})
export class SemesterModule {}