import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILoraPacket } from 'app/shared/model/lora-packet.model';
import { LoraPacketService } from './lora-packet.service';

@Component({
    selector: 'jhi-lora-packet-delete-dialog',
    templateUrl: './lora-packet-delete-dialog.component.html'
})
export class LoraPacketDeleteDialogComponent {
    loraPacket: ILoraPacket;

    constructor(private loraPacketService: LoraPacketService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loraPacketService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'loraPacketListModification',
                content: 'Deleted an loraPacket'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lora-packet-delete-popup',
    template: ''
})
export class LoraPacketDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loraPacket }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(LoraPacketDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.loraPacket = loraPacket;
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
