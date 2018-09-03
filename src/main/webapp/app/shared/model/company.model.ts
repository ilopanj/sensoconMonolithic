import { ILocation } from 'app/shared/model//location.model';
import { ISensorGroup } from 'app/shared/model//sensor-group.model';
import { IContact } from 'app/shared/model//contact.model';
import { INotificationGroup } from 'app/shared/model//notification-group.model';

export interface ICompany {
    id?: number;
    name?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    companySettingsId?: number;
    locations?: ILocation[];
    sensorGroups?: ISensorGroup[];
    contacts?: IContact[];
    notificationGroups?: INotificationGroup[];
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public name?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public companySettingsId?: number,
        public locations?: ILocation[],
        public sensorGroups?: ISensorGroup[],
        public contacts?: IContact[],
        public notificationGroups?: INotificationGroup[]
    ) {}
}
