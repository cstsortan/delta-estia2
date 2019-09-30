import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from 'src/app/home/home.component';
import { SemesterComponent } from 'src/app/semester/semester.component';
import { AdminComponent } from './admin/admin.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { UsefulLinksPageComponent } from './useful-links-page/useful-links-page.component';
import { InstructorPageComponent } from './instructor-page/instructor-page.component';
import { FoodComponent } from './food/food.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'semester/:id',
    component: SemesterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'course/:id',
    component: CoursePageComponent,
  },
  {
    path: 'useful-links',
    component: UsefulLinksPageComponent,
  },
  {
    path: 'instructor/:id',
    component: InstructorPageComponent,
  },
  {
    path: 'food',
    component: FoodComponent,
  },
  {
    path: 'forum',
    loadChildren: './forum/forum.module#ForumModule',
  },
  {
    path: 'washers',
    loadChildren: './washers/washers.module#WashersModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
