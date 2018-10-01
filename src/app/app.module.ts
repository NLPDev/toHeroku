import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SchoolModule } from './school/school.module';
import { SemesterModule } from './semester/semester.module';
import { PeriodModule } from './period/period.module';
import { RoomModule } from './room/room.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomeditComponent } from './roomedit/roomedit.component';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // default
    StaticModule,
    SettingsModule,

    // features
    SchoolModule,
    SemesterModule,
    PeriodModule,
    RoomModule,
    TeacherModule,
    CourseModule,
    SectionModule,
    ClassModule,
    StudentModule,
    ScheduleModule,
    // RoomeditModule,
    
    // app
    AppRoutingModule
  ],
  declarations: [AppComponent, RoomeditComponent], //add ,  when add roomedit
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
