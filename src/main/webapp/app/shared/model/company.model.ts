import { ILocation } from 'app/shared/model/location.model';

export interface ICompany {
    id?: number;
    name?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    locations?: ILocation[];
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public name?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public locations?: ILocation[]
    ) {}
}
