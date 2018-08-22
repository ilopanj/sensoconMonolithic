import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoraGateway } from 'app/shared/model/lora-gateway.model';
import { LoraGatewayService } from './lora-gateway.service';

@Component({
    selector: 'jhi-lora-gateway-delete-dialog',
    templateUrl: './lora-gateway-delete-dialog.component.html'
})
export class LoraGatewayDeleteDialogComponent {
    loraGateway: ILoraGateway;

    constructor(
        private loraGatewayService: LoraGatewayService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loraGatewayService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loraGatewayListModification',
                content: 'Deleted an loraGateway'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lora-gateway-delete-popup',
    template: ''
})
export class LoraGatewayDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loraGateway }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LoraGatewayDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.loraGateway = loraGateway;
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
