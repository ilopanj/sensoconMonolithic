import { ISensorDevice } from 'app/shared/model//sensor-device.model';
import { IContact } from 'app/shared/model//contact.model';
import { ICompany } from 'app/shared/model//company.model';

export interface INotificationGroup {
    id?: number;
    name?: string;
    sensorDevices?: ISensorDevice[];
    contacts?: IContact[];
    company?: ICompany;
}

export class NotificationGroup implements INotificationGroup {
    constructor(
        public id?: number,
        public name?: string,
        public sensorDevices?: ISensorDevice[],
        public contacts?: IContact[],
        public company?: ICompany
    ) {}
}
