/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class GitHubService {
  constructor(private http: Http){
  }
  getRepos(username){
    //return Observable
    let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
    return repos;
  }
}
