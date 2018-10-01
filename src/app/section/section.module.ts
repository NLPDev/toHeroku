import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { SectionComponent } from './section.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [SectionComponent]
})
export class SectionModule {}