/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorThresholdDeleteDialogComponent } from 'app/entities/sensor-threshold/sensor-threshold-delete-dialog.component';
import { SensorThresholdService } from 'app/entities/sensor-threshold/sensor-threshold.service';

describe('Component Tests', () => {
    describe('SensorThreshold Management Delete Component', () => {
        let comp: SensorThresholdDeleteDialogComponent;
        let fixture: ComponentFixture<SensorThresholdDeleteDialogComponent>;
        let service: SensorThresholdService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorThresholdDeleteDialogComponent]
            })
                .overrideTemplate(SensorThresholdDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SensorThresholdDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorThresholdService);
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
