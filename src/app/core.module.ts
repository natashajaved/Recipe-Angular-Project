import { LoggingService } from './logging.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { NgModule } from "@angular/core";
import { RecipeService } from './recipe/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInteceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInteceptorService, multi: true },
    ]
})
export class CoreModule {

}