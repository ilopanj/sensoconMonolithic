import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INotificationGroup } from 'app/shared/model/notification-group.model';
import { NotificationGroupService } from './notification-group.service';
import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from 'app/entities/contact';

@Component({
    selector: 'jhi-notification-group-update',
    templateUrl: './notification-group-update.component.html'
})
export class NotificationGroupUpdateComponent implements OnInit {
    private _notificationGroup: INotificationGroup;
    isSaving: boolean;

    contacts: IContact[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private notificationGroupService: NotificationGroupService,
        private contactService: ContactService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ notificationGroup }) => {
            this.notificationGroup = notificationGroup;
        });
        this.contactService.query().subscribe(
            (res: HttpResponse<IContact[]>) => {
                this.contacts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.notificationGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.notificationGroupService.update(this.notificationGroup));
        } else {
            this.subscribeToSaveResponse(this.notificationGroupService.create(this.notificationGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INotificationGroup>>) {
        result.subscribe((res: HttpResponse<INotificationGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackContactById(index: number, item: IContact) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get notificationGroup() {
        return this._notificationGroup;
    }

    set notificationGroup(notificationGroup: INotificationGroup) {
        this._notificationGroup = notificationGroup;
    }
}
