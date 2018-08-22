/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorGroupDeleteDialogComponent } from 'app/entities/sensor-group/sensor-group-delete-dialog.component';
import { SensorGroupService } from 'app/entities/sensor-group/sensor-group.service';

describe('Component Tests', () => {
    describe('SensorGroup Management Delete Component', () => {
        let comp: SensorGroupDeleteDialogComponent;
        let fixture: ComponentFixture<SensorGroupDeleteDialogComponent>;
        let service: SensorGroupService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorGroupDeleteDialogComponent]
            })
                .overrideTemplate(SensorGroupDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SensorGroupDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorGroupService);
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
