import { ICompany } from 'app/shared/model/company.model';
import { INotificationGroup } from 'app/shared/model/notification-group.model';

export interface IContact {
    id?: number;
    name?: string;
    alertPhoneNumber?: string;
    alertEmail?: string;
    company?: ICompany;
    notificationGroups?: INotificationGroup[];
}

export class Contact implements IContact {
    constructor(
        public id?: number,
        public name?: string,
        public alertPhoneNumber?: string,
        public alertEmail?: string,
        public company?: ICompany,
        public notificationGroups?: INotificationGroup[]
    ) {}
}
