export interface ISensorGroup {
    id?: number;
    name?: string;
}

export class SensorGroup implements ISensorGroup {
    constructor(public id?: number, public name?: string) {}
}
