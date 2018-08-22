import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INotificationGroup } from 'app/shared/model/notification-group.model';

@Component({
    selector: 'jhi-notification-group-detail',
    templateUrl: './notification-group-detail.component.html'
})
export class NotificationGroupDetailComponent implements OnInit {
    notificationGroup: INotificationGroup;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ notificationGroup }) => {
            this.notificationGroup = notificationGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
