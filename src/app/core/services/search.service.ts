import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly searchSubject$ = new ReplaySubject<string>(1);

  constructor() { }

  public get search$(): Observable<string> {
    return this.searchSubject$.asObservable();
  }

  public emitSearch(search: string): void {
    this.searchSubject$.next(search);
  }
}
