import { Input, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAnnotator]'
})
export class AnnotatorDirective {
	private originalText: string;
	private formattedText: string;
	private selections: {[key: number]: number} = {};

	constructor(private el: ElementRef) {
    console.log("el",el);
    this.originalText = el.nativeElement.value;
	}

	@HostListener('mouseup') onMouseUp() {
		var text = "";
		console.log("window", window);
		console.log("documnet", document);
  	/*if (window.getSelection) {
		  text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
		  text = document.selection.createRange().text;
		}*/
	}
}
