/**
 * Created by Tareq Boulakjar. from angulartypescript.com
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GitHubService {
  constructor(private http: Http){
  }
  getReposByKeyword(keyword: string){
    let repos = this.http.get(`https://api.github.com/search/repositories?q=${keyword}`);
    return repos;
  }
  getReposByUsername(username: string){
    //return Observable
    let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
    return repos;
  }
  getDetails(repo: GitHubRepo){
    let headers = new Headers();
    headers.append('Accept', 'application/vnd.github.VERSION.html');
    return this.http.get(`${repo.url}/readme`, { headers: headers });
  }
}

export class GitHubRepo {
  public url;
  constructor() {}
}
