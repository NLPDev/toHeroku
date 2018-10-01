import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { RoomComponent } from './room.component';

@NgModule({
  imports: [
  	SharedModule
  ],
  declarations: [RoomComponent]
})
export class RoomModule {}