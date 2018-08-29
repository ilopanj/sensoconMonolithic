import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { LoginModalService, Principal, Account } from 'app/core';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    locations: ILocation[];
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private locationService: LocationService
    ) {
        // var b = this.isAuthenticated();
    }

    loadAll() {
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocation[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }
    ngOnDestroy() {}
    trackId(index: number, item: ILocation) {
        return item.id;
    }

    /*
    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', response => this.loadAll());
    }
    */

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
