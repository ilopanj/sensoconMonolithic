/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorDeviceComponent } from 'app/entities/sensor-device/sensor-device.component';
import { SensorDeviceService } from 'app/entities/sensor-device/sensor-device.service';
import { SensorDevice } from 'app/shared/model/sensor-device.model';

describe('Component Tests', () => {
    describe('SensorDevice Management Component', () => {
        let comp: SensorDeviceComponent;
        let fixture: ComponentFixture<SensorDeviceComponent>;
        let service: SensorDeviceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorDeviceComponent],
                providers: []
            })
                .overrideTemplate(SensorDeviceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SensorDeviceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorDeviceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SensorDevice(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sensorDevices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
