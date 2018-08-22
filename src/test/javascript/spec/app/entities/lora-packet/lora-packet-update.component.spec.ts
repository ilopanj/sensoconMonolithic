/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { LoraPacketUpdateComponent } from 'app/entities/lora-packet/lora-packet-update.component';
import { LoraPacketService } from 'app/entities/lora-packet/lora-packet.service';
import { LoraPacket } from 'app/shared/model/lora-packet.model';

describe('Component Tests', () => {
    describe('LoraPacket Management Update Component', () => {
        let comp: LoraPacketUpdateComponent;
        let fixture: ComponentFixture<LoraPacketUpdateComponent>;
        let service: LoraPacketService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [LoraPacketUpdateComponent]
            })
                .overrideTemplate(LoraPacketUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoraPacketUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoraPacketService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new LoraPacket(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loraPacket = entity;
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
                    const entity = new LoraPacket();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.loraPacket = entity;
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
