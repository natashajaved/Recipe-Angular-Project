import { SpinnerComponent } from './spinner/spinner.component';
import { NgModule } from "@angular/core";
import { DropdownDiresctive } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        SpinnerComponent,
        DropdownDiresctive
    ],
    imports:[CommonModule],
    exports:[
        SpinnerComponent,
        DropdownDiresctive,
        CommonModule
    ]
})
export class SharedModule{

}