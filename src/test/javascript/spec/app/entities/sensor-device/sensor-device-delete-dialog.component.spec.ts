/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorDeviceDeleteDialogComponent } from 'app/entities/sensor-device/sensor-device-delete-dialog.component';
import { SensorDeviceService } from 'app/entities/sensor-device/sensor-device.service';

describe('Component Tests', () => {
    describe('SensorDevice Management Delete Component', () => {
        let comp: SensorDeviceDeleteDialogComponent;
        let fixture: ComponentFixture<SensorDeviceDeleteDialogComponent>;
        let service: SensorDeviceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorDeviceDeleteDialogComponent]
            })
                .overrideTemplate(SensorDeviceDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SensorDeviceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorDeviceService);
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
