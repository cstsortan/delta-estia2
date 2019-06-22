import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    template: `
        <home-page (should-login)="login()"></home-page>
    `,
    styles: [``]
})
export class ForumComponent implements OnInit {
    constructor(
        private authService: AuthService,
    ) { }

    login() {
        this.authService.openLoginModal();
    }
    
    ngOnInit(): void { }
}
