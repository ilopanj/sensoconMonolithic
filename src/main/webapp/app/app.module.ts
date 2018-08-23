import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { SensoconMonolithicSharedModule } from 'app/shared';
import { SensoconMonolithicCoreModule } from 'app/core';
import { SensoconMonolithicAppRoutingModule } from './app-routing.module';
import { SensoconMonolithicHomeModule } from './home/home.module';
import { SensoconMonolithicAccountModule } from './account/account.module';
import { SensoconMonolithicEntityModule } from './entities/entity.module';
import { SensoconMonolithicDashboardModule } from './dashboard/dashboard.module';
import { SensoconMonolithicAppHiThereModule } from './hi-there/hi-there.module';
import { CommonModule } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        SensoconMonolithicAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        SensoconMonolithicSharedModule,
        SensoconMonolithicCoreModule,
        SensoconMonolithicHomeModule,
        SensoconMonolithicAccountModule,
        SensoconMonolithicEntityModule,
        SensoconMonolithicDashboardModule,
        SensoconMonolithicAppHiThereModule,
        CommonModule,
        PlotlyModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class SensoconMonolithicAppModule {}
