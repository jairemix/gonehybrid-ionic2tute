import { Component } from '@angular/core';
import { GitHubService, GitHubUser, GitHubRepo } from '../../github/github.service';
import { NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
  providers: [GitHubService]
})

export class UserPage {
  public githubUser: GitHubUser;
  public states:any = {};
  public reposByUsername:GitHubRepo[];

  constructor (private nav: NavController, private navParams: NavParams, private github: GitHubService) {
    this.githubUser = navParams.get('user');
    console.log('this.githubUser', this.githubUser);
    this.load();
  }
  load () {
    this.states.$loading = true;
    let userReposObs = this.github.getReposByUsername(this.githubUser.login);
    userReposObs.subscribe(
      data => { //data handler
        this.reposByUsername = data.json() as GitHubRepo[];
        console.log('🐶 has found: this.reposByUsername', this.reposByUsername);
      },
      err => console.error('❌', err),
      () => { //no errors handler
        delete this.states.$loading;
        this.states.$loaded = true;
      }
    );
  }
  goToDetails(repo){
    this.nav.push(DetailsPage, { repo: repo });
  }
}