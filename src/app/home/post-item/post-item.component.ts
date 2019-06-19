import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  faArrowAltCircleRight = faArrowAltCircleRight;
  
  @Input()
  post: Post;

  text: string = '';

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
  }

  async sendComment() {
    if (!this.text) { return; }
    await this.postsService.postComment(this.post.id, this.text);
    this.text = '';
  }

}
