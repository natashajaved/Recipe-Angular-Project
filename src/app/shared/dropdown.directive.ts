import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDiresctive {
    @HostBinding('class.open') isOpen = false
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        console.log("toggle")
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
        console.log(this.isOpen, event.target)
    }
    constructor(private elRef: ElementRef) {
    }

    // @HostListener('click') toggleOpen() {
    //     this.isOpen = !this.isOpen
    // }
}