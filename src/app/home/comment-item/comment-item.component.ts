import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from 'src/app/models/post-comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input()
  comment: PostComment;

  constructor() { }

  ngOnInit() {
  }

}
