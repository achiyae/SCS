import { Input, Output, Directive, ElementRef, HostListener, EventEmitter } from '@angular/core';
import Annotation from '../../models/annotation.model';

@Directive({
  selector: '[appAnnotator]'
})
export class AnnotatorDirective {
	private originalText: string;
	private formattedText: string;
	@Input('appAnnotator') annotations: Annotation[] = [];
	@Input() requirementId: string;
	@Output() appAnnotatorChanged = new EventEmitter<Annotation[]>(); 

	constructor(private el: ElementRef) {
    //console.log("el",el);
    this.originalText = el.nativeElement.value;
	}

	@HostListener('mouseup') onMouseUp() {
		var range;
  	if (window.getSelection) {
		  range = window.getSelection().getRangeAt(0);
		} /* else if (document.selection && document.selection.type != "Control") {
		  text = document.selection.createRange().text;
		}*/ // for iexplorer < 9, creates compilation errors
		if(range) {
			//console.log("range", range);
			const start:number = range.startOffset;
			const end:number = range.endOffset;
			if(start < end) {
				this.addAnnotation(start,end);
			}
		}
	}
	
	private addAnnotation(start:number, end:number) {
		this.annotations.push(new Annotation(start, end, this.requirementId));
		this.appAnnotatorChanged.emit(this.annotations);
	}
}
