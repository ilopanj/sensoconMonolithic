export interface ICompanySettings {
    id?: number;
    defaultTimeoutSeconds?: number;
    defaultSuppressionSeconds?: number;
    companyId?: number;
}

export class CompanySettings implements ICompanySettings {
    constructor(
        public id?: number,
        public defaultTimeoutSeconds?: number,
        public defaultSuppressionSeconds?: number,
        public companyId?: number
    ) {}
}
