/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorThresholdDetailComponent } from 'app/entities/sensor-threshold/sensor-threshold-detail.component';
import { SensorThreshold } from 'app/shared/model/sensor-threshold.model';

describe('Component Tests', () => {
    describe('SensorThreshold Management Detail Component', () => {
        let comp: SensorThresholdDetailComponent;
        let fixture: ComponentFixture<SensorThresholdDetailComponent>;
        const route = ({ data: of({ sensorThreshold: new SensorThreshold(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorThresholdDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SensorThresholdDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SensorThresholdDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sensorThreshold).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
