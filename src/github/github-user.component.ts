import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPage } from '../pages/user/user';
import { GitHubUser } from './github.service';

@Component({
  selector: 'github-user',
  template: `
    <ion-card (click)="goToUser(githubUser)">
      <ion-card-header>
        {{githubUser.login}}
      </ion-card-header>
      <ion-card-content>
        {{githubUser.name}} {{githubUser.location}}
      </ion-card-content>
    </ion-card>
  `
})
export class GitHubUserComponent {
  @Input()
  public githubUser: GitHubUser;
  
  constructor (private nav: NavController) {}
  
  goToUser (user) {
    this.nav.push(UserPage, { user: user });
  }
}