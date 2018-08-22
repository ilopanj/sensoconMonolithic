import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISensor } from 'app/shared/model/sensor.model';

type EntityResponseType = HttpResponse<ISensor>;
type EntityArrayResponseType = HttpResponse<ISensor[]>;

@Injectable({ providedIn: 'root' })
export class SensorService {
    private resourceUrl = SERVER_API_URL + 'api/sensors';

    constructor(private http: HttpClient) {}

    create(sensor: ISensor): Observable<EntityResponseType> {
        return this.http.post<ISensor>(this.resourceUrl, sensor, { observe: 'response' });
    }

    update(sensor: ISensor): Observable<EntityResponseType> {
        return this.http.put<ISensor>(this.resourceUrl, sensor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISensor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISensor[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
