import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  limit$ = new BehaviorSubject(10);

  isLoadingPosts = true;
  posts: Post[] = [];
  _postsSubscription: Subscription;

  event: any;

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit() {
    this._postsSubscription = this.limit$.pipe(
      switchMap(limit =>  this.postsService.getPosts(limit))
    ).subscribe(posts => {
      this.isLoadingPosts = false;
      this.posts = posts;

      if (this.event) {
        this.event.target.complete();
        this.event = null;
      }
    });
  }

  trackById(i, item: any) {
    return item.id;
  }

  loadMore(event) {
    this.event = event;
    this.limit$.next(this.limit$.value + 10);
  }

}
