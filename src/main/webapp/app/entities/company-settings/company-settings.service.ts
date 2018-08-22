import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompanySettings } from 'app/shared/model/company-settings.model';

type EntityResponseType = HttpResponse<ICompanySettings>;
type EntityArrayResponseType = HttpResponse<ICompanySettings[]>;

@Injectable({ providedIn: 'root' })
export class CompanySettingsService {
    private resourceUrl = SERVER_API_URL + 'api/company-settings';

    constructor(private http: HttpClient) {}

    create(companySettings: ICompanySettings): Observable<EntityResponseType> {
        return this.http.post<ICompanySettings>(this.resourceUrl, companySettings, { observe: 'response' });
    }

    update(companySettings: ICompanySettings): Observable<EntityResponseType> {
        return this.http.put<ICompanySettings>(this.resourceUrl, companySettings, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompanySettings>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompanySettings[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
