import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPostModalComponent } from './new-post-modal/new-post-modal.component';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPlusCircle = faPlusCircle;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {

  }

  createNewPost() {
    this.modalService.open(NewPostModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'h-100'
    });
  }

}
