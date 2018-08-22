/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { LoraGatewayUpdateComponent } from 'app/entities/lora-gateway/lora-gateway-update.component';
import { LoraGatewayService } from 'app/entities/lora-gateway/lora-gateway.service';
import { LoraGateway } from 'app/shared/model/lora-gateway.model';

describe('Component Tests', () => {
    describe('LoraGateway Management Update Component', () => {
        let comp: LoraGatewayUpdateComponent;
        let fixture: ComponentFixture<LoraGatewayUpdateComponent>;
        let service: LoraGatewayService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [LoraGatewayUpdateComponent]
            })
                .overrideTemplate(LoraGatewayUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoraGatewayUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoraGatewayService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LoraGateway(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loraGateway = entity;
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
                    const entity = new LoraGateway();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loraGateway = entity;
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
