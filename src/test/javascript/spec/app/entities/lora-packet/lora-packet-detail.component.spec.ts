/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { LoraPacketDetailComponent } from 'app/entities/lora-packet/lora-packet-detail.component';
import { LoraPacket } from 'app/shared/model/lora-packet.model';

describe('Component Tests', () => {
    describe('LoraPacket Management Detail Component', () => {
        let comp: LoraPacketDetailComponent;
        let fixture: ComponentFixture<LoraPacketDetailComponent>;
        const route = ({ data: of({ loraPacket: new LoraPacket(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [LoraPacketDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LoraPacketDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoraPacketDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.loraPacket).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
