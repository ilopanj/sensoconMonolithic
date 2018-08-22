import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILoraPacket } from 'app/shared/model/lora-packet.model';

type EntityResponseType = HttpResponse<ILoraPacket>;
type EntityArrayResponseType = HttpResponse<ILoraPacket[]>;

@Injectable({ providedIn: 'root' })
export class LoraPacketService {
    private resourceUrl = SERVER_API_URL + 'api/lora-packets';

    constructor(private http: HttpClient) {}

    create(loraPacket: ILoraPacket): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(loraPacket);
        return this.http
            .post<ILoraPacket>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(loraPacket: ILoraPacket): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(loraPacket);
        return this.http
            .put<ILoraPacket>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILoraPacket>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILoraPacket[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(loraPacket: ILoraPacket): ILoraPacket {
        const copy: ILoraPacket = Object.assign({}, loraPacket, {
            timestamp: loraPacket.timestamp != null && loraPacket.timestamp.isValid() ? loraPacket.timestamp.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((loraPacket: ILoraPacket) => {
            loraPacket.timestamp = loraPacket.timestamp != null ? moment(loraPacket.timestamp) : null;
        });
        return res;
    }
}
