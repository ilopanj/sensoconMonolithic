import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INotificationGroup } from 'app/shared/model/notification-group.model';

type EntityResponseType = HttpResponse<INotificationGroup>;
type EntityArrayResponseType = HttpResponse<INotificationGroup[]>;

@Injectable({ providedIn: 'root' })
export class NotificationGroupService {
    private resourceUrl = SERVER_API_URL + 'api/notification-groups';

    constructor(private http: HttpClient) {}

    create(notificationGroup: INotificationGroup): Observable<EntityResponseType> {
        return this.http.post<INotificationGroup>(this.resourceUrl, notificationGroup, { observe: 'response' });
    }

    update(notificationGroup: INotificationGroup): Observable<EntityResponseType> {
        return this.http.put<INotificationGroup>(this.resourceUrl, notificationGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INotificationGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INotificationGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
