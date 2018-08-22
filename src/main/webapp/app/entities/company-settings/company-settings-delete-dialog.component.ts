import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompanySettings } from 'app/shared/model/company-settings.model';
import { CompanySettingsService } from './company-settings.service';

@Component({
    selector: 'jhi-company-settings-delete-dialog',
    templateUrl: './company-settings-delete-dialog.component.html'
})
export class CompanySettingsDeleteDialogComponent {
    companySettings: ICompanySettings;

    constructor(
        private companySettingsService: CompanySettingsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.companySettingsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'companySettingsListModification',
                content: 'Deleted an companySettings'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-company-settings-delete-popup',
    template: ''
})
export class CompanySettingsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ companySettings }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompanySettingsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.companySettings = companySettings;
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
