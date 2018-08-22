import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILoraPacket } from 'app/shared/model/lora-packet.model';

@Component({
    selector: 'jhi-lora-packet-detail',
    templateUrl: './lora-packet-detail.component.html'
})
export class LoraPacketDetailComponent implements OnInit {
    loraPacket: ILoraPacket;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ loraPacket }) => {
            this.loraPacket = loraPacket;
        });
    }

    previousState() {
        window.history.back();
    }
}
