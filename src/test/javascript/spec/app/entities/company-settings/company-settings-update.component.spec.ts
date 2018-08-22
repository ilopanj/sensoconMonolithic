/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { CompanySettingsUpdateComponent } from 'app/entities/company-settings/company-settings-update.component';
import { CompanySettingsService } from 'app/entities/company-settings/company-settings.service';
import { CompanySettings } from 'app/shared/model/company-settings.model';

describe('Component Tests', () => {
    describe('CompanySettings Management Update Component', () => {
        let comp: CompanySettingsUpdateComponent;
        let fixture: ComponentFixture<CompanySettingsUpdateComponent>;
        let service: CompanySettingsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [CompanySettingsUpdateComponent]
            })
                .overrideTemplate(CompanySettingsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanySettingsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanySettingsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompanySettings(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.companySettings = entity;
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
                    const entity = new CompanySettings();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.companySettings = entity;
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
