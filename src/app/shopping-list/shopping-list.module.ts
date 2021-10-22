import { LoggingService } from './../logging.service';
import { FormsModule } from '@angular/forms';
import { ShoppingListRouterModule } from './shopping-list-router.module';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [SharedModule, ShoppingListRouterModule, FormsModule],
})
export class ShoppingListModule {

}