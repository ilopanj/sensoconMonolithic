export interface ILoraGateway {
    id?: number;
    gatewayId?: string;
    name?: string;
    locationId?: number;
}

export class LoraGateway implements ILoraGateway {
    constructor(public id?: number, public gatewayId?: string, public name?: string, public locationId?: number) {}
}
