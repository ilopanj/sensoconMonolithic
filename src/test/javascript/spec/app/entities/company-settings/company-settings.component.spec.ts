/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { CompanySettingsComponent } from 'app/entities/company-settings/company-settings.component';
import { CompanySettingsService } from 'app/entities/company-settings/company-settings.service';
import { CompanySettings } from 'app/shared/model/company-settings.model';

describe('Component Tests', () => {
    describe('CompanySettings Management Component', () => {
        let comp: CompanySettingsComponent;
        let fixture: ComponentFixture<CompanySettingsComponent>;
        let service: CompanySettingsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [CompanySettingsComponent],
                providers: []
            })
                .overrideTemplate(CompanySettingsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanySettingsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanySettingsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanySettings(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companySettings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
