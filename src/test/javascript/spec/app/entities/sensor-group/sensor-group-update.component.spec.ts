/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { SensorGroupUpdateComponent } from 'app/entities/sensor-group/sensor-group-update.component';
import { SensorGroupService } from 'app/entities/sensor-group/sensor-group.service';
import { SensorGroup } from 'app/shared/model/sensor-group.model';

describe('Component Tests', () => {
    describe('SensorGroup Management Update Component', () => {
        let comp: SensorGroupUpdateComponent;
        let fixture: ComponentFixture<SensorGroupUpdateComponent>;
        let service: SensorGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [SensorGroupUpdateComponent]
            })
                .overrideTemplate(SensorGroupUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SensorGroupUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SensorGroupService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SensorGroup(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sensorGroup = entity;
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
                    const entity = new SensorGroup();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.sensorGroup = entity;
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
