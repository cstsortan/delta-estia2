import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewPostModalComponent } from './new-post-modal/new-post-modal.component';
import { PostsService } from '../services/posts.service';
import { FeedbackService } from '../services/feedback.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faPlusCircle = faPlusCircle;

  userFeedbackComment = '';
  hasSentFeedback = false;

  constructor(
    private modalService: NgbModal,
    private feedbackService: FeedbackService,
    private toastController: ToastController,
  ) {
    this.hasSentFeedback = feedbackService.userFeedbackExists();
  }

  ngOnInit() {

  }

  createNewPost() {
    this.modalService.open(NewPostModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'h-100'
    });
  }

  async onLike(like: boolean) {
    await this.feedbackService.setUserFeedback(like, this.userFeedbackComment);
    this.toastController.create({
      message: 'Ευχαριστούμε που βοηθάτε να κάνουμε την εφαρμογή καλύτερη!',
      duration: 2000
    });
    this.hasSentFeedback = true;
  }

}
