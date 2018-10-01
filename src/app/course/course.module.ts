import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { CourseComponent } from './course.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [CourseComponent]
})
export class CourseModule {}