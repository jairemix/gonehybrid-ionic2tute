import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GitHubService } from '../../app/github';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [GitHubService]
})
export class DetailsPage {
  public readme = '';
  public repo;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private github: GitHubService){

    this.repo = navParams.get('repo');
    console.log('this.repo', this.repo);

    this.github.getDetails(this.repo).subscribe(
      data => {
        this.readme = data.text()
        console.log('this.readme', this.readme);
      },
      err => {
        if (err.status === 404){
          this.readme = 'This repo does not have a README';
        }
        else {
          console.error(err);
        }
      },
      () => console.log('getDetails completed')
    );

  }

}
