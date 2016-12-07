import { Component } from '@angular/core';
import { GitHubService } from '../../app/github';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GitHubService]
})
export class DetailsPage {
  public foundRepos;
  public username;

  constructor(private nav: NavController){
  }


  // constructor(public navCtrl: NavController) {
  //
  // }

}
