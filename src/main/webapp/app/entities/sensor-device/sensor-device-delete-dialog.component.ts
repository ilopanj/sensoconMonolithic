import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISensorDevice } from 'app/shared/model/sensor-device.model';
import { SensorDeviceService } from './sensor-device.service';

@Component({
    selector: 'jhi-sensor-device-delete-dialog',
    templateUrl: './sensor-device-delete-dialog.component.html'
})
export class SensorDeviceDeleteDialogComponent {
    sensorDevice: ISensorDevice;

    constructor(
        private sensorDeviceService: SensorDeviceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sensorDeviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sensorDeviceListModification',
                content: 'Deleted an sensorDevice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sensor-device-delete-popup',
    template: ''
})
export class SensorDeviceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sensorDevice }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SensorDeviceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.sensorDevice = sensorDevice;
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
