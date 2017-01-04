import { Component } from '@angular/core';
import { GitHubService, GitHubRepo } from '../../app/github';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import * as Rx from 'rxjs';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService]
})

//TODO learn more about TypeScript types, ES6 module imports, RxJS Observable chaining
export class HomePage {
  public reposByUsername;
  public reposByKeyword;
  public searchQuery: string;
  public states: any = {};

  constructor(private github: GitHubService,
              private nav: NavController){
    //@debug
    (<any>window).homeCompo = this;
    (<any>window).Rx = Rx;
  }

  getRepos(){
    //subscribe to Observable
    console.log('🐶 says: getting repos');
    this.states.$loading = true;
    let usernameObs = this.github.getReposByUsername(this.searchQuery);
    usernameObs.subscribe(
      data => { //data handler
        this.reposByUsername = data.json() as GitHubRepo;
        console.log('🐶 has found: this.reposByUsername', this.reposByUsername);
      },
      err => {
        console.error('❌', err); // error handler
      },
      () => { //no errors handler
        console.log('🐶 says: getRepos by username completed')
      }
    );
    let keywordObs = this.github.getReposByKeyword(this.searchQuery);
    keywordObs.subscribe(
      data => {
        this.reposByKeyword = data.json().items as GitHubRepo;
        console.log('🐶 has found: this.reposByKeyword', this.reposByKeyword);
      },
      err => console.error('❌', err),
      () => console.log('🐶 says: getRepos by keyword completed')
    );
    Rx.Observable.forkJoin([usernameObs, keywordObs]).subscribe(
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
    console.log('go to details page', DetailsPage);
    this.nav.push(DetailsPage, { repo: repo });
  }

}
