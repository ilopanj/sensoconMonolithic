/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorGroupComponent } from 'app/entities/sensor-group/sensor-group.component';
import { SensorGroupService } from 'app/entities/sensor-group/sensor-group.service';
import { SensorGroup } from 'app/shared/model/sensor-group.model';

describe('Component Tests', () => {
    describe('SensorGroup Management Component', () => {
        let comp: SensorGroupComponent;
        let fixture: ComponentFixture<SensorGroupComponent>;
        let service: SensorGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorGroupComponent],
                providers: []
            })
                .overrideTemplate(SensorGroupComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SensorGroupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorGroupService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SensorGroup(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sensorGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
