import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShowLoaderService {

    public IsRequestPending: Subject<boolean> = new Subject<boolean>();

    constructor() { }
}
