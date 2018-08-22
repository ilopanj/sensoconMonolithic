/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { CompanySettingsDetailComponent } from 'app/entities/company-settings/company-settings-detail.component';
import { CompanySettings } from 'app/shared/model/company-settings.model';

describe('Component Tests', () => {
    describe('CompanySettings Management Detail Component', () => {
        let comp: CompanySettingsDetailComponent;
        let fixture: ComponentFixture<CompanySettingsDetailComponent>;
        const route = ({ data: of({ companySettings: new CompanySettings(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [CompanySettingsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompanySettingsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompanySettingsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.companySettings).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
