import { NgModule } from '@angular/core';
import { MathjaxDirective } from './mathjax.directive';
import { MathjaxDefaultConfig, mathjax_url, RootMathjaxConfig, } from '../models';
import * as i0 from "@angular/core";
import * as i1 from "../models";
export class MathjaxModule {
    constructor(moduleConfig) {
        this.moduleConfig = moduleConfig;
        //
        this.addConfigToDocument();
        //
        this.addMatjaxToDocument();
    }
    addConfigToDocument() {
        const tagId = 'mathjax-config-script';
        const isScript = document.getElementById(tagId);
        if (isScript)
            return;
        //
        const providConfig = {
            ...MathjaxDefaultConfig,
            ...(this.moduleConfig?.config ?? {}),
        };
        const script = document.createElement('script');
        script.id = tagId;
        script.type = 'text/javascript';
        script.text = `
      MathJax = ${JSON.stringify(providConfig)};
      MathJax.isReady = false;
      MathJax.promise = new Promise(function (resolve, reject) {
        MathJax.startup = {
            ready() {
              MathJax.isReady = true;
              MathJax.startup.defaultReady();
              MathJax.startup.promise.then(() => resolve());
            }
        };
      });
    `;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    addMatjaxToDocument() {
        const tagId = 'mathjax-script';
        const isScript = document.getElementById(tagId);
        if (isScript)
            return;
        //
        const script = document.createElement('script');
        script.id = tagId;
        script.type = 'text/javascript';
        script.src = this.moduleConfig?.src ?? mathjax_url;
        script.async = true;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    static forRoot(config) {
        return {
            ngModule: MathjaxModule,
            providers: [{ provide: RootMathjaxConfig, useValue: config ?? {} }],
        };
    }
    static forChild() {
        return {
            ngModule: MathjaxModule,
        };
    }
}
MathjaxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule, deps: [{ token: i1.RootMathjaxConfig }], target: i0.ɵɵFactoryTarget.NgModule });
MathjaxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule, declarations: [MathjaxDirective], exports: [MathjaxDirective] });
MathjaxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MathjaxDirective],
                    exports: [MathjaxDirective],
                }]
        }], ctorParameters: function () { return [{ type: i1.RootMathjaxConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aGpheC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRoamF4LWxpYi9zcmMvZGlyZWN0aXZlL21hdGhqYXgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLGlCQUFpQixHQUNsQixNQUFNLFdBQVcsQ0FBQzs7O0FBTW5CLE1BQU0sT0FBTyxhQUFhO0lBQ3hCLFlBQW9CLFlBQStCO1FBQS9CLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUNqRCxFQUFFO1FBQ0YsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsRUFBRTtRQUNGLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyxtQkFBbUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsdUJBQXVCLENBQUM7UUFDdEMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLFFBQVE7WUFBRSxPQUFPO1FBQ3JCLEVBQUU7UUFDRixNQUFNLFlBQVksR0FBRztZQUNuQixHQUFHLG9CQUFvQjtZQUN2QixHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDO1NBQ3JDLENBQUM7UUFDRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBc0IsQ0FBQztRQUNyRSxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLEdBQUc7a0JBQ0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7Ozs7O0tBV3pDLENBQUM7UUFDRixRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyxtQkFBbUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUM7UUFDL0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLFFBQVE7WUFBRSxPQUFPO1FBQ3JCLEVBQUU7UUFDRixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBc0IsQ0FBQztRQUNyRSxNQUFNLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLElBQUksV0FBVyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQ25CLE1BQTBCO1FBRTFCLE9BQU87WUFDTCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxJQUFJLEVBQUUsRUFBRSxDQUFDO1NBQ3BFLENBQUM7SUFDSixDQUFDO0lBQ00sTUFBTSxDQUFDLFFBQVE7UUFDcEIsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUM7SUFDSixDQUFDOzswR0E3RFUsYUFBYTsyR0FBYixhQUFhLGlCQUhULGdCQUFnQixhQUNyQixnQkFBZ0I7MkdBRWYsYUFBYTsyRkFBYixhQUFhO2tCQUp6QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUNoQyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0aGpheERpcmVjdGl2ZSB9IGZyb20gJy4vbWF0aGpheC5kaXJlY3RpdmUnO1xuaW1wb3J0IHtcbiAgTWF0aGpheERlZmF1bHRDb25maWcsXG4gIG1hdGhqYXhfdXJsLFxuICBSb290TWF0aGpheENvbmZpZyxcbn0gZnJvbSAnLi4vbW9kZWxzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTWF0aGpheERpcmVjdGl2ZV0sXG4gIGV4cG9ydHM6IFtNYXRoamF4RGlyZWN0aXZlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0aGpheE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kdWxlQ29uZmlnOiBSb290TWF0aGpheENvbmZpZykge1xuICAgIC8vXG4gICAgdGhpcy5hZGRDb25maWdUb0RvY3VtZW50KCk7XG4gICAgLy9cbiAgICB0aGlzLmFkZE1hdGpheFRvRG9jdW1lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ29uZmlnVG9Eb2N1bWVudCgpIHtcbiAgICBjb25zdCB0YWdJZCA9ICdtYXRoamF4LWNvbmZpZy1zY3JpcHQnO1xuICAgIGNvbnN0IGlzU2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFnSWQpO1xuICAgIGlmIChpc1NjcmlwdCkgcmV0dXJuO1xuICAgIC8vXG4gICAgY29uc3QgcHJvdmlkQ29uZmlnID0ge1xuICAgICAgLi4uTWF0aGpheERlZmF1bHRDb25maWcsXG4gICAgICAuLi4odGhpcy5tb2R1bGVDb25maWc/LmNvbmZpZyA/PyB7fSksXG4gICAgfTtcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKSBhcyBIVE1MU2NyaXB0RWxlbWVudDtcbiAgICBzY3JpcHQuaWQgPSB0YWdJZDtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC50ZXh0ID0gYFxuICAgICAgTWF0aEpheCA9ICR7SlNPTi5zdHJpbmdpZnkocHJvdmlkQ29uZmlnKX07XG4gICAgICBNYXRoSmF4LmlzUmVhZHkgPSBmYWxzZTtcbiAgICAgIE1hdGhKYXgucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgTWF0aEpheC5zdGFydHVwID0ge1xuICAgICAgICAgICAgcmVhZHkoKSB7XG4gICAgICAgICAgICAgIE1hdGhKYXguaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgIE1hdGhKYXguc3RhcnR1cC5kZWZhdWx0UmVhZHkoKTtcbiAgICAgICAgICAgICAgTWF0aEpheC5zdGFydHVwLnByb21pc2UudGhlbigoKSA9PiByZXNvbHZlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cblxuICBwcml2YXRlIGFkZE1hdGpheFRvRG9jdW1lbnQoKSB7XG4gICAgY29uc3QgdGFnSWQgPSAnbWF0aGpheC1zY3JpcHQnO1xuICAgIGNvbnN0IGlzU2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFnSWQpO1xuICAgIGlmIChpc1NjcmlwdCkgcmV0dXJuO1xuICAgIC8vXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JykgYXMgSFRNTFNjcmlwdEVsZW1lbnQ7XG4gICAgc2NyaXB0LmlkID0gdGFnSWQ7XG4gICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICBzY3JpcHQuc3JjID0gdGhpcy5tb2R1bGVDb25maWc/LnNyYyA/PyBtYXRoamF4X3VybDtcbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChcbiAgICBjb25maWc/OiBSb290TWF0aGpheENvbmZpZ1xuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1hdGhqYXhNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hdGhqYXhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFJvb3RNYXRoamF4Q29uZmlnLCB1c2VWYWx1ZTogY29uZmlnID8/IHt9IH1dLFxuICAgIH07XG4gIH1cbiAgcHVibGljIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1hdGhqYXhNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hdGhqYXhNb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuIl19