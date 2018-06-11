import { SimpleChanges, OnChanges, Input, Output, Directive, ElementRef, HostListener, EventEmitter } from '@angular/core';
import Annotation from '../../models/annotation.model';

@Directive({
  selector: '[appAnnotator]'
})
export class AnnotatorDirective implements OnChanges {
	private highlightNode;
	@Input('appAnnotator') annotations: Annotation[] = [];
	@Input() requirementId: string;
	@Input() text: string;
	@Output() annotationAdded = new EventEmitter<Annotation>();
	@Output() annotationDeleted = new EventEmitter<Annotation>();

	constructor(private el: ElementRef) {
    this.highlightNode = document.createElement("span");
    this.highlightNode.style.cssText = 'background-color: #FFFF00';
    el.nativeElement.innerHTML = this.text;
	}
	
	ngOnChanges(change: SimpleChanges) {
		this.el.nativeElement.innerHTML = this.text;
		this.redraw();
		//console.log("req id", this.requirementId);
	}
	
	private redraw() {
		for(let a of this.annotations) {
			this.setSelectionRange(this.el.nativeElement, a.position, a.position + a.length);
			this.highlight("yellow");
		}
	}
	
	@HostListener('mouseup') onMouseUp() {
		var range;
  	if (window.getSelection) {
		  range = window.getSelection().getRangeAt(0);
		  if(range) {
		  	const offsetStart = this.v(this.el.nativeElement, range.startContainer)
	    	const offsetEnd = this.v(this.el.nativeElement, range.endContainer)
	    	const start = offsetStart+range.startOffset;
	    	const end = offsetEnd+range.endOffset;
	    	this.addAnnotation(start,end);
				this.highlight("yellow");
			}
		}
	}
	
	private addAnnotation(start:number, end:number) {
		const a:Annotation = new Annotation(start, end-start, this.requirementId);
		this.annotations.push(a);
		this.annotationAdded.emit(a);
	}
	
	private makeEditableAndHighlight(colour) {
	  var sel = window.getSelection();
	  if (sel.rangeCount && sel.getRangeAt) {
	    var range = sel.getRangeAt(0);
	  }
	  document.designMode = "on";
	  if (range) {
	    //sel.removeAllRanges();
	    //sel.addRange(range);
	    //const offset = this.getCaretCharacterOffsetWithin(this.el.nativeElement, range) - 1;
	    
	  }
	  // Use HiliteColor since some browsers apply BackColor to the whole block
	  if (!document.execCommand("HiliteColor", false, colour)) {
	  	document.execCommand("BackColor", false, colour);
	  }
	  document.designMode = "off";
	  sel.removeAllRanges();
	}
	
	private v(element1, element2): number {
		var range = document.createRange();
		range.setStart(element1, 0);
		range.setEndBefore(element2);
		return range.toString().length;
	}
	
	private highlight(colour) {
	  var range, sel;
	  if (window.getSelection) {
	  	//IE9 and non-IE
		  try {
		  	if (!document.execCommand("BackColor", false, colour)) {
		  		//console.log("here");
		  		this.makeEditableAndHighlight(colour);
		  	}
			} catch (ex) {
				console.log("ex",ex);
		  	this.makeEditableAndHighlight(colour)
			}
			sel = window.getSelection();
      sel.removeAllRanges();
		}	
	}
	
	private getTextNodesIn(node) {
    var textNodes = [];
    if (node.nodeType == 3) {
        textNodes.push(node);
    } else {
        var children = node.childNodes;
        for (var i = 0, len = children.length; i < len; ++i) {
            textNodes.push.apply(textNodes, this.getTextNodesIn(children[i]));
        }
    }
    return textNodes;
	}

	private setSelectionRange(el, start, end) {
    if (document.createRange && window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var textNodes = this.getTextNodesIn(el);
        var foundStart = false;
        var charCount = 0, endCharCount;

        for (var i = 0, textNode; textNode = textNodes[i++]; ) {
            endCharCount = charCount + textNode.length;
            if (!foundStart && start >= charCount
                    && (start < endCharCount ||
                    (start == endCharCount && i <= textNodes.length))) {
                range.setStart(textNode, start - charCount);
                foundStart = true;
            }
            if (foundStart && end <= endCharCount) {
                range.setEnd(textNode, end - charCount);
                break;
            }
            charCount = endCharCount;
        }

        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } /*else if (document.selection && document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(true);
        textRange.moveEnd("character", end);
        textRange.moveStart("character", start);
        textRange.select();
    }*/
	}

	private getCaretCharacterOffsetWithin(element, range): number {
    var caretOffset = 0;
    var preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
    return caretOffset;
	}
}
