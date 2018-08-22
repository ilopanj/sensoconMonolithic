export interface ISensor {
    id?: number;
    name?: string;
    alertsEnabled?: boolean;
    sensorDeviceId?: number;
}

export class Sensor implements ISensor {
    constructor(public id?: number, public name?: string, public alertsEnabled?: boolean, public sensorDeviceId?: number) {
        this.alertsEnabled = this.alertsEnabled || false;
    }
}
