/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorDeviceUpdateComponent } from 'app/entities/sensor-device/sensor-device-update.component';
import { SensorDeviceService } from 'app/entities/sensor-device/sensor-device.service';
import { SensorDevice } from 'app/shared/model/sensor-device.model';

describe('Component Tests', () => {
    describe('SensorDevice Management Update Component', () => {
        let comp: SensorDeviceUpdateComponent;
        let fixture: ComponentFixture<SensorDeviceUpdateComponent>;
        let service: SensorDeviceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorDeviceUpdateComponent]
            })
                .overrideTemplate(SensorDeviceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SensorDeviceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorDeviceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SensorDevice(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sensorDevice = entity;
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
                    const entity = new SensorDevice();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sensorDevice = entity;
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
