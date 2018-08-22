export interface ICompanySettings {
    id?: number;
    defaultTimeoutSeconds?: number;
    defaultSuppressionSeconds?: number;
}

export class CompanySettings implements ICompanySettings {
    constructor(public id?: number, public defaultTimeoutSeconds?: number, public defaultSuppressionSeconds?: number) {}
}
