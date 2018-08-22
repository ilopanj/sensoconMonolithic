/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorGroupDetailComponent } from 'app/entities/sensor-group/sensor-group-detail.component';
import { SensorGroup } from 'app/shared/model/sensor-group.model';

describe('Component Tests', () => {
    describe('SensorGroup Management Detail Component', () => {
        let comp: SensorGroupDetailComponent;
        let fixture: ComponentFixture<SensorGroupDetailComponent>;
        const route = ({ data: of({ sensorGroup: new SensorGroup(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorGroupDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SensorGroupDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SensorGroupDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.sensorGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
