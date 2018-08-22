/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { NotificationGroupUpdateComponent } from 'app/entities/notification-group/notification-group-update.component';
import { NotificationGroupService } from 'app/entities/notification-group/notification-group.service';
import { NotificationGroup } from 'app/shared/model/notification-group.model';

describe('Component Tests', () => {
    describe('NotificationGroup Management Update Component', () => {
        let comp: NotificationGroupUpdateComponent;
        let fixture: ComponentFixture<NotificationGroupUpdateComponent>;
        let service: NotificationGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [NotificationGroupUpdateComponent]
            })
                .overrideTemplate(NotificationGroupUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotificationGroupUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationGroupService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NotificationGroup(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.notificationGroup = entity;
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
                    const entity = new NotificationGroup();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.notificationGroup = entity;
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
