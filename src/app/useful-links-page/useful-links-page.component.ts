import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../models/content';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-useful-links-page',
  templateUrl: './useful-links-page.component.html',
  styleUrls: ['./useful-links-page.component.scss']
})
export class UsefulLinksPageComponent implements OnInit {

  usefulLinks$: Observable<Content[]>;

  constructor(
    private contentService: ContentService,
  ) { }

  ngOnInit() {
    this.usefulLinks$ = this.contentService.getContentsOfType('useful');
  }

}
