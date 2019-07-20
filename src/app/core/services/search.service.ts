import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly searchSubject$ = new ReplaySubject<string>(1);

  constructor() { }

  public get search$(): Observable<any> {
    return this.searchSubject$.asObservable();
  }

  public emitSearch(search): void {
    this.searchSubject$.next(search);
  }
}
