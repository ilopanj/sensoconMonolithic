import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISensorGroup } from 'app/shared/model/sensor-group.model';

type EntityResponseType = HttpResponse<ISensorGroup>;
type EntityArrayResponseType = HttpResponse<ISensorGroup[]>;

@Injectable({ providedIn: 'root' })
export class SensorGroupService {
    private resourceUrl = SERVER_API_URL + 'api/sensor-groups';

    constructor(private http: HttpClient) {}

    create(sensorGroup: ISensorGroup): Observable<EntityResponseType> {
        return this.http.post<ISensorGroup>(this.resourceUrl, sensorGroup, { observe: 'response' });
    }

    update(sensorGroup: ISensorGroup): Observable<EntityResponseType> {
        return this.http.put<ISensorGroup>(this.resourceUrl, sensorGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISensorGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISensorGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
