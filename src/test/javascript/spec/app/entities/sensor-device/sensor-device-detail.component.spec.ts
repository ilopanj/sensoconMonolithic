/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorDeviceDetailComponent } from 'app/entities/sensor-device/sensor-device-detail.component';
import { SensorDevice } from 'app/shared/model/sensor-device.model';

describe('Component Tests', () => {
    describe('SensorDevice Management Detail Component', () => {
        let comp: SensorDeviceDetailComponent;
        let fixture: ComponentFixture<SensorDeviceDetailComponent>;
        const route = ({ data: of({ sensorDevice: new SensorDevice(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorDeviceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SensorDeviceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SensorDeviceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sensorDevice).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
