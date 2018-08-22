/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { LoraPacketComponent } from 'app/entities/lora-packet/lora-packet.component';
import { LoraPacketService } from 'app/entities/lora-packet/lora-packet.service';
import { LoraPacket } from 'app/shared/model/lora-packet.model';

describe('Component Tests', () => {
    describe('LoraPacket Management Component', () => {
        let comp: LoraPacketComponent;
        let fixture: ComponentFixture<LoraPacketComponent>;
        let service: LoraPacketService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [LoraPacketComponent],
                providers: []
            })
                .overrideTemplate(LoraPacketComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoraPacketComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoraPacketService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LoraPacket(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.loraPackets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
