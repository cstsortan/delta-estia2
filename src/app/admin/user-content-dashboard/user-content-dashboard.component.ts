import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../../models/content';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-user-content-dashboard',
  templateUrl: './user-content-dashboard.component.html',
  styleUrls: ['./user-content-dashboard.component.scss']
})
export class UserContentDashboardComponent implements OnInit {

  userContent$: Observable<Content[]>;

  constructor(
    private contentService: ContentService
  ) {}

  ngOnInit() {
    this.userContent$ = this.contentService.getUserContent();
  }

}
