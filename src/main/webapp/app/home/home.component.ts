import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { LoginModalService, Principal, Account } from 'app/core';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material';

/**
 * Dialog
 */
export interface DialogData {
    location: string;
    name: string;
}

/**
 * HomeComponent
 */
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    locations: ILocation[];
    account: Account;
    modalRef: NgbModalRef;
    /* Dialog */
    location: string;
    name: string;
    panelOpenState = false;

    constructor(
        public dialog: MatDialog,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private locationService: LocationService
    ) {}
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
    openDialog(): void {
        const dialogRef = this.dialog.open(LocationSensorDialog, {
            width: '650px',
            data: { name: this.name, location: this.location }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
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

/**
 * LocationSensorDialog
 */
@Component({
    selector: 'location-sensor.dialog',
    templateUrl: './location-sensor.dialog.html'
})
export class LocationSensorDialog {
    /**
     * Constructor
     *
     * @param {MatDialogRef<ExpansionOverviewExampleDialog>} dialogRef
     * @param {DialogData} data
     */
    constructor(public dialogRef: MatDialogRef<LocationSensorDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    onNoClick(): void {
        this.dialogRef.close();
    }
} // end class
