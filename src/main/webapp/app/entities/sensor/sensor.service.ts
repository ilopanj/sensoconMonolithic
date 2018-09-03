import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

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
        const copy = this.convertDateFromClient(sensor);
        return this.http
            .post<ISensor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sensor: ISensor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sensor);
        return this.http
            .put<ISensor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISensor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISensor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(sensor: ISensor): ISensor {
        const copy: ISensor = Object.assign({}, sensor, {
            lastAlert: sensor.lastAlert != null && sensor.lastAlert.isValid() ? sensor.lastAlert.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.lastAlert = res.body.lastAlert != null ? moment(res.body.lastAlert) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((sensor: ISensor) => {
            sensor.lastAlert = sensor.lastAlert != null ? moment(sensor.lastAlert) : null;
        });
        return res;
    }
}
