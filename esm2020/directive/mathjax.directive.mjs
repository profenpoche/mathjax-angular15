import { Directive, Input, } from '@angular/core';
import { fixMathjaxBugs, getMathjaxContent, isMathjax } from '../utils';
import * as i0 from "@angular/core";
export class MathjaxDirective {
    //
    set mathjax(val) {
        this.mathJaxExpressions = val;
    }
    //
    constructor(el) {
        this.el = el;
        //
        this.element = el.nativeElement;
    }
    ngOnChanges(changes) {
        const expressions = changes.mathjax;
        if (!expressions ||
            expressions.currentValue === expressions.previousValue) {
            return;
        }
        //
        const value = getMathjaxContent(expressions.currentValue) + '';
        //
        if (isMathjax(value)) {
            const filteredVal = fixMathjaxBugs(value);
            this.typeset(() => {
                this.element.innerHTML = `<div class='jax-process'>${filteredVal}</div>`;
            });
        }
        else {
            this.element.innerHTML = value;
        }
    }
    typeset(code) {
        if (!MathJax?.isReady) {
            this.element.innerHTML = `<div></div>`;
            return MathJax.promise.then(() => this.typeset(code));
        }
        else {
            MathJax.startup.promise = MathJax.startup.promise
                .then(() => MathJax.typesetPromise(code()))
                .catch((err) => console.log('Typeset failed: ' + err.message));
            return MathJax.startup.promise;
        }
    }
}
MathjaxDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MathjaxDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: MathjaxDirective, selector: "mathjax,[mathjax]", inputs: { mathjax: "mathjax" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mathjax,[mathjax]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { mathjax: [{
                type: Input,
                args: ['mathjax']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aGpheC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRoamF4LWxpYi9zcmMvZGlyZWN0aXZlL21hdGhqYXguZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDOztBQU14RSxNQUFNLE9BQU8sZ0JBQWdCO0lBSzNCLEVBQUU7SUFDRixJQUNJLE9BQU8sQ0FBQyxHQUE0QjtRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxFQUFFO0lBQ0YsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDaEMsRUFBRTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDcEMsSUFDRSxDQUFDLFdBQVc7WUFDWixXQUFXLENBQUMsWUFBWSxLQUFLLFdBQVcsQ0FBQyxhQUFhLEVBQ3REO1lBQ0EsT0FBTztTQUNSO1FBQ0QsRUFBRTtRQUNGLE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0QsRUFBRTtRQUNGLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsNEJBQTRCLFdBQVcsUUFBUSxDQUFDO1lBQzNFLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUNoQztJQUNILENBQUM7SUFFTyxPQUFPLENBQUMsSUFBZ0I7UUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1lBQ3ZDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU87aUJBQzlDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzFDLEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN0RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7NkdBL0NVLGdCQUFnQjtpR0FBaEIsZ0JBQWdCOzJGQUFoQixnQkFBZ0I7a0JBSDVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtpQkFDOUI7aUdBUUssT0FBTztzQkFEVixLQUFLO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZml4TWF0aGpheEJ1Z3MsIGdldE1hdGhqYXhDb250ZW50LCBpc01hdGhqYXggfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBNYXRoamF4Q29udGVudCB9IGZyb20gJy4uL21vZGVscyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ21hdGhqYXgsW21hdGhqYXhdJyxcbn0pXG5leHBvcnQgY2xhc3MgTWF0aGpheERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8vXG4gIHByaXZhdGUgbWF0aEpheEV4cHJlc3Npb25zPzogTWF0aGpheENvbnRlbnQgfCBzdHJpbmc7XG4gIC8vXG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIC8vXG4gIEBJbnB1dCgnbWF0aGpheCcpXG4gIHNldCBtYXRoamF4KHZhbDogTWF0aGpheENvbnRlbnQgfCBzdHJpbmcpIHtcbiAgICB0aGlzLm1hdGhKYXhFeHByZXNzaW9ucyA9IHZhbDtcbiAgfVxuICAvL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgLy9cbiAgICB0aGlzLmVsZW1lbnQgPSBlbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IGV4cHJlc3Npb25zID0gY2hhbmdlcy5tYXRoamF4O1xuICAgIGlmIChcbiAgICAgICFleHByZXNzaW9ucyB8fFxuICAgICAgZXhwcmVzc2lvbnMuY3VycmVudFZhbHVlID09PSBleHByZXNzaW9ucy5wcmV2aW91c1ZhbHVlXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vXG4gICAgY29uc3QgdmFsdWUgPSBnZXRNYXRoamF4Q29udGVudChleHByZXNzaW9ucy5jdXJyZW50VmFsdWUpICsgJyc7XG4gICAgLy9cbiAgICBpZiAoaXNNYXRoamF4KHZhbHVlKSkge1xuICAgICAgY29uc3QgZmlsdGVyZWRWYWwgPSBmaXhNYXRoamF4QnVncyh2YWx1ZSk7XG4gICAgICB0aGlzLnR5cGVzZXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9J2pheC1wcm9jZXNzJz4ke2ZpbHRlcmVkVmFsfTwvZGl2PmA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHlwZXNldChjb2RlOiAoKSA9PiB2b2lkKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoIU1hdGhKYXg/LmlzUmVhZHkpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSBgPGRpdj48L2Rpdj5gO1xuICAgICAgcmV0dXJuIE1hdGhKYXgucHJvbWlzZS50aGVuKCgpID0+IHRoaXMudHlwZXNldChjb2RlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE1hdGhKYXguc3RhcnR1cC5wcm9taXNlID0gTWF0aEpheC5zdGFydHVwLnByb21pc2VcbiAgICAgICAgLnRoZW4oKCkgPT4gTWF0aEpheC50eXBlc2V0UHJvbWlzZShjb2RlKCkpKVxuICAgICAgICAuY2F0Y2goKGVycjogYW55KSA9PiBjb25zb2xlLmxvZygnVHlwZXNldCBmYWlsZWQ6ICcgKyBlcnIubWVzc2FnZSkpO1xuICAgICAgcmV0dXJuIE1hdGhKYXguc3RhcnR1cC5wcm9taXNlO1xuICAgIH1cbiAgfVxufVxuIl19