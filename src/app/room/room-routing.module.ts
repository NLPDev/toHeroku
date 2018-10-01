import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { StudentComponent } from '../student/student.component';


const routes: Routes = [  
  {
    path: 'student',
    component: StudentComponent,
    data: { title: 'anms.menu.student' }
  },
  {
    path: '**',
    redirectTo: 'school'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class RoomRoutingModule {}
