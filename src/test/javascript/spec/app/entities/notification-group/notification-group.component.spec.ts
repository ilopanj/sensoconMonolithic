/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { NotificationGroupComponent } from 'app/entities/notification-group/notification-group.component';
import { NotificationGroupService } from 'app/entities/notification-group/notification-group.service';
import { NotificationGroup } from 'app/shared/model/notification-group.model';

describe('Component Tests', () => {
    describe('NotificationGroup Management Component', () => {
        let comp: NotificationGroupComponent;
        let fixture: ComponentFixture<NotificationGroupComponent>;
        let service: NotificationGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [NotificationGroupComponent],
                providers: []
            })
                .overrideTemplate(NotificationGroupComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NotificationGroupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotificationGroupService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NotificationGroup(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.notificationGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
