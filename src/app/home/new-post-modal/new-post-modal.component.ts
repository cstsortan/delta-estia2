import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase/app';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post-modal',
  templateUrl: './new-post-modal.component.html',
  styleUrls: ['./new-post-modal.component.css']
})
export class NewPostModalComponent implements OnInit {
  floor = 0;
  color = 'default';
  text = '';
  imageUrl = '';
  constructor(
    private modalRef: NgbActiveModal,
    private postsService: PostsService,
  ) { }

  ngOnInit() {
  }

  onImageChanged(files: FileList) {
    if (!files || !files[0]) return;
		const ref = firebase.storage().ref('photos')
			.child(`photo_${Date.now()}`);
    ref.put(files[0])
    .then(res => ref.getDownloadURL())
    .then(imageUrl => this.imageUrl = imageUrl);
  }

  onSubmitted() {
    if (this.text.trim() === '' && this.imageUrl === '') return;
    this.postsService.makePost({
      color: this.color,
      floor: parseInt(`${this.floor}`, 10),
      imageUrl: this.imageUrl,
      text: this.text,
    });
    this.modalRef.close();
  }

}
