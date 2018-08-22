import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISensorThreshold } from 'app/shared/model/sensor-threshold.model';
import { SensorThresholdService } from './sensor-threshold.service';

@Component({
    selector: 'jhi-sensor-threshold-delete-dialog',
    templateUrl: './sensor-threshold-delete-dialog.component.html'
})
export class SensorThresholdDeleteDialogComponent {
    sensorThreshold: ISensorThreshold;

    constructor(
        private sensorThresholdService: SensorThresholdService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sensorThresholdService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sensorThresholdListModification',
                content: 'Deleted an sensorThreshold'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sensor-threshold-delete-popup',
    template: ''
})
export class SensorThresholdDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sensorThreshold }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SensorThresholdDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sensorThreshold = sensorThreshold;
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
