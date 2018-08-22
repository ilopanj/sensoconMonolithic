import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISensorDevice } from 'app/shared/model/sensor-device.model';

type EntityResponseType = HttpResponse<ISensorDevice>;
type EntityArrayResponseType = HttpResponse<ISensorDevice[]>;

@Injectable({ providedIn: 'root' })
export class SensorDeviceService {
    private resourceUrl = SERVER_API_URL + 'api/sensor-devices';

    constructor(private http: HttpClient) {}

    create(sensorDevice: ISensorDevice): Observable<EntityResponseType> {
        return this.http.post<ISensorDevice>(this.resourceUrl, sensorDevice, { observe: 'response' });
    }

    update(sensorDevice: ISensorDevice): Observable<EntityResponseType> {
        return this.http.put<ISensorDevice>(this.resourceUrl, sensorDevice, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISensorDevice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISensorDevice[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
