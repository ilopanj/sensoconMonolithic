export interface ILoraGateway {
    id?: number;
    gatewayId?: string;
    name?: string;
}

export class LoraGateway implements ILoraGateway {
    constructor(public id?: number, public gatewayId?: string, public name?: string) {}
}
