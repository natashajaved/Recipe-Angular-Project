import { FormsModule } from '@angular/forms';
import { AuthRouterModule } from './auth-router.module';
import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [AuthComponent],
    imports: [AuthRouterModule, SharedModule, FormsModule]

})
export class AuthModule { }