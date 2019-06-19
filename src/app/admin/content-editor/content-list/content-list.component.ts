import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { Observable } from 'rxjs';
import { Content } from '../../../models/content';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss']
})
export class ContentListComponent implements OnInit {

  content$: Observable<Content[]>;

  constructor(
    private content: ContentService,
  ) { }

  ngOnInit() {
    this.content$ = this.content.getContent();
  }

  trackByFn(index: number, item: Content): string {
    return item.id;
  }

}
