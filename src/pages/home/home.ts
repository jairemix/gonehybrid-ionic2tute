import { Component } from '@angular/core';
import { GitHubService } from '../../app/github';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService]
})
export class HomePage {
  public foundRepos;
  public username;

  constructor(private github: GitHubService,
              private nav: NavController){
  }

  getRepos(){
    //subscribe to Observable
    console.log('getting repos');
    this.github.getRepos(this.username).subscribe(
      data => { //data handler
        this.foundRepos = data.json();
        console.log('this.foundRepos', this.foundRepos);
      },
      err => console.error(err), // error handler
      () => console.log('getRepos completed') //no errors handler
    );
  }

  goToDetails(repo){
    console.log('go to details page', DetailsPage);
    this.nav.push(DetailsPage, { repo: repo });
  }

}
