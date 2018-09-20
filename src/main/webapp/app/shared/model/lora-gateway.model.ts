import { ILocation } from 'app/shared/model/location.model';

export interface ILoraGateway {
    id?: number;
    gatewayId?: string;
    name?: string;
    location?: ILocation;
}

export class LoraGateway implements ILoraGateway {
    constructor(public id?: number, public gatewayId?: string, public name?: string, public location?: ILocation) {}
}
