import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { ClassComponent } from './class.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [ClassComponent]
})
export class ClassModule {}