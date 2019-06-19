import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PostComment } from 'src/app/models/post-comment';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  @Input()
  postId: string;

  comments$: Observable<PostComment[]>;

  constructor(
    private postsService: PostsService,
  ) {
  }

  ngOnInit() {
    this.comments$ = this.postsService.getComments(this.postId);
  }

}
