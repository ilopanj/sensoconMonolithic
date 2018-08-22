/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { LoraGatewayDetailComponent } from 'app/entities/lora-gateway/lora-gateway-detail.component';
import { LoraGateway } from 'app/shared/model/lora-gateway.model';

describe('Component Tests', () => {
    describe('LoraGateway Management Detail Component', () => {
        let comp: LoraGatewayDetailComponent;
        let fixture: ComponentFixture<LoraGatewayDetailComponent>;
        const route = ({ data: of({ loraGateway: new LoraGateway(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [LoraGatewayDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(LoraGatewayDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(LoraGatewayDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.loraGateway).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
