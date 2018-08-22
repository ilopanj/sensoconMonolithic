import { ISensorDevice } from 'app/shared/model//sensor-device.model';
import { IContact } from 'app/shared/model//contact.model';

export interface INotificationGroup {
    id?: number;
    name?: string;
    sensorDevices?: ISensorDevice[];
    contacts?: IContact[];
}

export class NotificationGroup implements INotificationGroup {
    constructor(public id?: number, public name?: string, public sensorDevices?: ISensorDevice[], public contacts?: IContact[]) {}
}
