import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotificationGroup } from 'app/shared/model/notification-group.model';
import { NotificationGroupService } from './notification-group.service';

@Component({
    selector: 'jhi-notification-group-delete-dialog',
    templateUrl: './notification-group-delete-dialog.component.html'
})
export class NotificationGroupDeleteDialogComponent {
    notificationGroup: INotificationGroup;

    constructor(
        private notificationGroupService: NotificationGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificationGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'notificationGroupListModification',
                content: 'Deleted an notificationGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notification-group-delete-popup',
    template: ''
})
export class NotificationGroupDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ notificationGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NotificationGroupDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.notificationGroup = notificationGroup;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
