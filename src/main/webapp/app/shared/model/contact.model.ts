import { INotificationGroup } from 'app/shared/model//notification-group.model';

export interface IContact {
    id?: number;
    alertPhoneNumber?: string;
    alertEmail?: string;
    companyId?: number;
    notificationGroups?: INotificationGroup[];
}

export class Contact implements IContact {
    constructor(
        public id?: number,
        public alertPhoneNumber?: string,
        public alertEmail?: string,
        public companyId?: number,
        public notificationGroups?: INotificationGroup[]
    ) {}
}
