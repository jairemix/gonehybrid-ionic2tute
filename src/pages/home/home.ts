import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
// import * as Rx from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { GitHubRepo, GitHubService, GitHubUser } from '../../github/github.service';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService]
})

//TODO learn more about TypeScript types, ES6 module imports, RxJS Observable chaining
export class HomePage {
  // public reposByUsername;
  public userFound: GitHubUser;
  public reposByKeyword: Array<GitHubRepo>; // or GithubRepo[]
  public searchQuery: string;
  public states: any = {};

  constructor(private github: GitHubService,
              private nav: NavController){
    //@debug
    (<any>window).homeCompo = this;
    // (<any>window).Observable = Observable;
  }

  getRepos(){
    //subscribe to Observable
    console.log('🐶 says: getting repos');
    this.states.$loading = true;

    let usernameObs = this.github.getUser(this.searchQuery);
    usernameObs.subscribe(
      data => {
        this.userFound = data.json() as GitHubUser;
        console.log('🐱 this.userFound', this.userFound);
      },
      err => console.error('❌', err),
      () => console.log('🐶 says: getUser by username completed')
    )

    let keywordObs = this.github.getReposByKeyword(this.searchQuery);
    keywordObs.subscribe(
      data => {
        this.reposByKeyword = data.json().items as GitHubRepo[];
        console.log('🐶 has found: this.reposByKeyword', this.reposByKeyword);
      },
      err => console.error('❌', err),
      () => console.log('🐶 says: getRepos by keyword completed')
    );
    Observable.forkJoin([usernameObs, keywordObs]).subscribe(
      () => {
        delete this.states.$loading;
        this.states.$loaded = true;
      },
      () => {
        delete this.states.$loading;
        this.states.$error = true;
      }
    );
  }

  goToDetails(repo){
    this.nav.push(DetailsPage, { repo: repo });
  }

  goToUser(user){
    this.nav.push(UserPage, { user: user });
  }

}
