import { INotificationGroup } from 'app/shared/model//notification-group.model';

export interface IContact {
    id?: number;
    emailAddress?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    alertNumber?: string;
    alertEmail?: string;
    notificationGroups?: INotificationGroup[];
}

export class Contact implements IContact {
    constructor(
        public id?: number,
        public emailAddress?: string,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public alertNumber?: string,
        public alertEmail?: string,
        public notificationGroups?: INotificationGroup[]
    ) {}
}
