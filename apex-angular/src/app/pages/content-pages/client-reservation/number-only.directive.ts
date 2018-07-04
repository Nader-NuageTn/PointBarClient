import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[myNumberOnly]'
})
export class NumberOnlyDirective {
    // Allow decimal numbers and negative values
    private regexNational: RegExp = new RegExp(/^-?([0-9]{0,8})$/g);
    private regexGlobal1: RegExp = new RegExp(/^-?(\+[216]{0,1})+([0-9]{0,8})$/g);
    private regexGlobal2: RegExp = new RegExp(/^-?(\+[1]{0,1})+([0-9]{0,10})$/g);
    private regexGlobal3: RegExp = new RegExp(/^-?(\+[33]{0,1})+([0-9]{0,9})$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];

    constructor(private el: ElementRef) {
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);
        if (next && !String(next).match(this.regexNational) && !String(next).match(this.regexGlobal1) && !String(next).match(this.regexGlobal2) && !String(next).match(this.regexGlobal3)) {
            event.preventDefault();
        }

    }

    @HostListener('blur', ['$event'])
    onBlur(event: KeyboardEvent) {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        if (current && !String(current).match(this.regexNational) && !String(current).match(this.regexGlobal1) && !String(current).match(this.regexGlobal2) && !String(current).match(this.regexGlobal3)) {

            console.log(this.el.nativeElement.value);
            this.el.nativeElement.value = null;
            console.log(this.el.nativeElement.value);

        }
    }

    @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
        e.preventDefault();
    }

    @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
        e.preventDefault();
    }

    @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
        e.preventDefault();
    }
}