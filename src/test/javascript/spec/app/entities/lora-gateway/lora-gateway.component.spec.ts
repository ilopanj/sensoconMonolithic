/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SensoconMonolithicTestModule } from '../../../test.module';
import { LoraGatewayComponent } from 'app/entities/lora-gateway/lora-gateway.component';
import { LoraGatewayService } from 'app/entities/lora-gateway/lora-gateway.service';
import { LoraGateway } from 'app/shared/model/lora-gateway.model';

describe('Component Tests', () => {
    describe('LoraGateway Management Component', () => {
        let comp: LoraGatewayComponent;
        let fixture: ComponentFixture<LoraGatewayComponent>;
        let service: LoraGatewayService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [SensoconMonolithicTestModule],
                declarations: [LoraGatewayComponent],
                providers: []
            })
                .overrideTemplate(LoraGatewayComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(LoraGatewayComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoraGatewayService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new LoraGateway(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.loraGateways[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
