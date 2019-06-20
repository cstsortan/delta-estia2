import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/forum/interfaces/tag';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags-editor',
  templateUrl: './tags-editor.component.html',
  styleUrls: ['./tags-editor.component.css']
})
export class TagsEditorComponent implements OnInit {
  newTag: Tag = {
    colour: "#000000",
    description: "",
    name: ""
  };


  tags$: Observable<Tag[]>;
  constructor(
    private tagsService: TagsService
  ) {
    this.tags$ = tagsService.getTags();
  }

  ngOnInit() {
  }

  colorChanged(color: string) {
    this.newTag.colour = color;
  }

  createTag() {
    if (!this.newTag.name.trim() || !this.newTag.description.trim()) {
      return;
    }

    this.tagsService.createTag(this.newTag);

    this.newTag = {
      colour: '#000000',
      name: '',
      description: ''
    };
  }

  deleteTag(tagId: string) {
    this.tagsService.deleteTag(tagId);
  }

}
