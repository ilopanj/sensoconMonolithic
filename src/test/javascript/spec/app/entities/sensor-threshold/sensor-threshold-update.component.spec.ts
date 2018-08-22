/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorThresholdUpdateComponent } from 'app/entities/sensor-threshold/sensor-threshold-update.component';
import { SensorThresholdService } from 'app/entities/sensor-threshold/sensor-threshold.service';
import { SensorThreshold } from 'app/shared/model/sensor-threshold.model';

describe('Component Tests', () => {
    describe('SensorThreshold Management Update Component', () => {
        let comp: SensorThresholdUpdateComponent;
        let fixture: ComponentFixture<SensorThresholdUpdateComponent>;
        let service: SensorThresholdService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorThresholdUpdateComponent]
            })
                .overrideTemplate(SensorThresholdUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SensorThresholdUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorThresholdService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SensorThreshold(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sensorThreshold = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SensorThreshold();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sensorThreshold = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
