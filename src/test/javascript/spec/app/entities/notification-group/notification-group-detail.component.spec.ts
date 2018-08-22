/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { NotificationGroupDetailComponent } from 'app/entities/notification-group/notification-group-detail.component';
import { NotificationGroup } from 'app/shared/model/notification-group.model';

describe('Component Tests', () => {
    describe('NotificationGroup Management Detail Component', () => {
        let comp: NotificationGroupDetailComponent;
        let fixture: ComponentFixture<NotificationGroupDetailComponent>;
        const route = ({ data: of({ notificationGroup: new NotificationGroup(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [NotificationGroupDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NotificationGroupDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NotificationGroupDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.notificationGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
