/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { LoraGatewayDeleteDialogComponent } from 'app/entities/lora-gateway/lora-gateway-delete-dialog.component';
import { LoraGatewayService } from 'app/entities/lora-gateway/lora-gateway.service';

describe('Component Tests', () => {
    describe('LoraGateway Management Delete Component', () => {
        let comp: LoraGatewayDeleteDialogComponent;
        let fixture: ComponentFixture<LoraGatewayDeleteDialogComponent>;
        let service: LoraGatewayService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [LoraGatewayDeleteDialogComponent]
            })
                .overrideTemplate(LoraGatewayDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoraGatewayDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoraGatewayService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
