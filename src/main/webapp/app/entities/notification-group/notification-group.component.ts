import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INotificationGroup } from 'app/shared/model/notification-group.model';
import { Principal } from 'app/core';
import { NotificationGroupService } from './notification-group.service';

@Component({
    selector: 'jhi-notification-group',
    templateUrl: './notification-group.component.html'
})
export class NotificationGroupComponent implements OnInit, OnDestroy {
    notificationGroups: INotificationGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private notificationGroupService: NotificationGroupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.notificationGroupService.query().subscribe(
            (res: HttpResponse<INotificationGroup[]>) => {
                this.notificationGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNotificationGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INotificationGroup) {
        return item.id;
    }

    registerChangeInNotificationGroups() {
        this.eventSubscriber = this.eventManager.subscribe('notificationGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
