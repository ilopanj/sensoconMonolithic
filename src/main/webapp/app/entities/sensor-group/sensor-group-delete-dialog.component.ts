import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISensorGroup } from 'app/shared/model/sensor-group.model';
import { SensorGroupService } from './sensor-group.service';

@Component({
    selector: 'jhi-sensor-group-delete-dialog',
    templateUrl: './sensor-group-delete-dialog.component.html'
})
export class SensorGroupDeleteDialogComponent {
    sensorGroup: ISensorGroup;

    constructor(
        private sensorGroupService: SensorGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sensorGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sensorGroupListModification',
                content: 'Deleted an sensorGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sensor-group-delete-popup',
    template: ''
})
export class SensorGroupDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sensorGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SensorGroupDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sensorGroup = sensorGroup;
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
