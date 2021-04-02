import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  setCurrentUrlByRoute : (route: ActivatedRoute) => void;

  private currentUrl$ = new Observable(observer => {
    this.setCurrentUrlByRoute = (route: ActivatedRoute) => observer.next(this.buildUrlFromActivatedRoute(route));
  });

  private buildUrlFromActivatedRoute(route: ActivatedRoute){
    return route.snapshot.url.reduce((acc, segment) => acc += '/' + segment.path, '');
  }

  getCurrentUrl(){
    return this.currentUrl$;
  }

}
