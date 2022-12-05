
import { Observable, Subject, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface BrodcastEvent {
    key: any;
    data?: any;
}

@Injectable({
    providedIn: 'root'
})


export class Brodcaster {
    private _eventBus: Subject<BrodcastEvent>;

    constructor() {
        this._eventBus = new Subject<BrodcastEvent>();
    }

    brodcast(key: any, data?: any) {
        this._eventBus.next({ key, data });
    }

    on<T>(key: any): Observable<T> {
        return this._eventBus.asObservable().pipe(
            filter(event => event.key === key),
            map(event => <T>event.data)
        );

    }
}