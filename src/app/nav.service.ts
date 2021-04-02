import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  private static currentUrl$ = new Subject();

  private buildUrlFromActivatedRoute(route: ActivatedRoute){
    return route.snapshot.url.reduce((acc, segment) => acc += '/' + segment.path, '');
  }

  setCurrentUrlByRoute(route: ActivatedRoute){
   NavService.currentUrl$.next(this.buildUrlFromActivatedRoute(route));
  }

  getCurrentUrl(){
    return NavService.currentUrl$;
  }

}
