import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <home-page></home-page>
        <post-page></post-page>
    `,
    styles: [``]
})
export class ForumComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
