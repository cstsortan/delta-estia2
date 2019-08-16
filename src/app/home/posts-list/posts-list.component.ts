import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  isLoadingPosts = true;
  posts: Post[] = [];
  _postsSubscription: Subscription;

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    this._postsSubscription = this.postsService.getPosts().subscribe(posts => {
      this.isLoadingPosts = false;
      this.posts = posts;
    });
  }

  trackById(i, item: any) {
    return item.id;
  }

}
