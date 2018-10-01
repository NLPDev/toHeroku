import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolComponent } from './school/school.component';
import { SemesterComponent } from './semester/semester.component';
import { PeriodComponent } from './period/period.component';
import { RoomComponent } from './room/room.component';
import { TeacherComponent } from './teacher/teacher.component';
import { CourseComponent } from './course/course.component';
import { SectionComponent } from './section/section.component';
import { ClassComponent } from './class/class.component';
import { StudentComponent } from './student/student.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SettingsContainerComponent } from './settings';
import { RoomeditComponent } from './roomedit/roomedit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'school',
    pathMatch: 'full'
  },
  {
    path: 'school',
    component: SchoolComponent,
    data: { title: 'anms.menu.school' }
  },
  {
    path: 'semester',
    component: SemesterComponent,
    data: { title: 'anms.menu.semester' }
  },
  {
    path: 'period',
    component: PeriodComponent,
    data: { title: 'anms.menu.period' }
  },
  {
    path: 'room',
    component: RoomComponent,
    data: { title: 'anms.menu.room' }
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    data: { title: 'anms.menu.teacher' }
  },
  {
    path: 'course',
    component: CourseComponent,
    data: { title: 'anms.menu.course' }
  },
  {
    path: 'section',
    component: SectionComponent,
    data: { title: 'anms.menu.section' }
  },
  {
    path: 'class',
    component: ClassComponent,
    data: { title: 'anms.menu.class' }
  },
  {
    path: 'student',
    component: StudentComponent,
    data: { title: 'anms.menu.student' }
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    data: { title: 'anms.menu.schedule' }
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
   path: 'roomedit',
   component: RoomeditComponent,
   data: { title: 'anms.menu.roomedit' }
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
export class AppRoutingModule {}
