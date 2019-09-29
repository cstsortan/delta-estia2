import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DataService } from './services/data.service';
import { SemesterComponent } from './semester/semester.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdminComponent } from './admin/admin.component';
import { InstructorService } from './services/instructor.service';
import { FormsModule } from '@angular/forms';
import { InstructorsEditorComponent } from './admin/instructors-editor/instructors-editor.component';
import { CourseEditorComponent } from './admin/course-editor/course-editor.component';
import { CourseService } from './services/course.service';
import { CourseItemComponent } from './admin/course-editor/course-item/course-item.component';
import { SemesterCoursesComponent } from './admin/course-editor/semester-courses/semester-courses.component';
import { CourseComponent } from './semester/course/course.component';
import { InstructorsPipe } from './pipes/instructors.pipe';
import { ContentEditorComponent } from './admin/content-editor/content-editor.component';
import { ContentFormComponent } from './admin/content-editor/content-form/content-form.component';
import { UploadPercentPipe } from './pipes/upload-percent.pipe';
import { ContentService } from './services/content.service';
import { ContentListComponent } from './admin/content-editor/content-list/content-list.component';
import { ContentListItemComponent } from './admin/content-editor/content-list-item/content-list-item.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { UsefulLinksPageComponent } from './useful-links-page/useful-links-page.component';
import { InstructorPageComponent } from './instructor-page/instructor-page.component';
import { ContentCardComponent } from './content-card/content-card.component';
import { UserFacingContentFormComponent } from './user-facing-content-form/user-facing-content-form.component';
import { UserContentDashboardComponent } from 'src/app/admin/user-content-dashboard/user-content-dashboard.component';
import { UserContentItemComponent } from './admin/user-content-dashboard/user-content-item/user-content-item.component';
import { ContentTypePipe } from './pipes/content-type.pipe';
import { PostsListComponent } from './home/posts-list/posts-list.component';
import { PostItemComponent } from './home/post-item/post-item.component';
import { CommentsListComponent } from './home/comments-list/comments-list.component';
import { CommentItemComponent } from './home/comment-item/comment-item.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NewPostModalComponent } from './home/new-post-modal/new-post-modal.component';
import { FoodComponent } from './food/food.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TagsEditorComponent } from './admin/tags-editor/tags-editor.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';

// import { defineCustomElements } from 'cstsortan-components/loader';
// defineCustomElements(window);
import { TimeAgoPipe } from './pipes/timeago.pipe';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SemesterComponent,
    AdminComponent,
    InstructorsEditorComponent,
    CourseEditorComponent,
    CourseItemComponent,
    SemesterCoursesComponent,
    CourseComponent,
    InstructorsPipe,
    ContentEditorComponent,
    ContentFormComponent,
    UploadPercentPipe,
    ContentListComponent,
    ContentListItemComponent,
    CoursePageComponent,
    UsefulLinksPageComponent,
    InstructorPageComponent,
    ContentCardComponent,
    UserFacingContentFormComponent,
    UserContentDashboardComponent,
    UserContentItemComponent,
    ContentTypePipe,
    PostsListComponent,
    PostItemComponent,
    CommentsListComponent,
    CommentItemComponent,
    NewPostModalComponent,
    FoodComponent,
    TagsEditorComponent,
    AuthModalComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    NgbModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    IonicModule.forRoot({
      // mode: "ios"
    }),
  ],
  providers: [
    DataService,
    InstructorService,
    CourseService,
    ContentService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ContentFormComponent,
    UserFacingContentFormComponent,
    NewPostModalComponent,
    AuthModalComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
