import { NgModule } from '@angular/core';

import { SensoconMonolithicSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [SensoconMonolithicSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [SensoconMonolithicSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class SensoconMonolithicSharedCommonModule {}
