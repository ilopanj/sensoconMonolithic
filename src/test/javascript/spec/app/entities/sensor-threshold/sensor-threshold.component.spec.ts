/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorThresholdComponent } from 'app/entities/sensor-threshold/sensor-threshold.component';
import { SensorThresholdService } from 'app/entities/sensor-threshold/sensor-threshold.service';
import { SensorThreshold } from 'app/shared/model/sensor-threshold.model';

describe('Component Tests', () => {
    describe('SensorThreshold Management Component', () => {
        let comp: SensorThresholdComponent;
        let fixture: ComponentFixture<SensorThresholdComponent>;
        let service: SensorThresholdService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorThresholdComponent],
                providers: []
            })
                .overrideTemplate(SensorThresholdComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SensorThresholdComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorThresholdService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SensorThreshold(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sensorThresholds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
