import * as i0 from '@angular/core';
import { Directive, Input, NgModule } from '@angular/core';

/**
 * will help to check if expression is valid majax or not
 */
const isMathjaxRegExp = /(?:\$|\\\(|\\\[|\\begin\{.*?})/;
//export const isMathJax = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;
//
const mathjax_url = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/startup.js';
/**
 * config - http://docs.mathjax.org/en/latest/web/configuration.html#configuring-and-loading-mathjax
 */
const MathjaxDefaultConfig = {
    loader: {
        load: ['output/svg', '[tex]/require', '[tex]/ams'],
    },
    tex: {
        inlineMath: [['$', '$']],
        //displayMath: [['$$', '$$']],
        packages: ['base', 'require', 'ams'],
    },
    svg: { fontCache: 'global' },
};
/**
 * config - http://docs.mathjax.org/en/latest/web/configuration.html#configuring-and-loading-mathjax
 * src - cdn url to js
 */
class RootMathjaxConfig {
}

//
//
const isMathjax = (expression) => !!expression?.match(isMathjaxRegExp);
//
/**
 * find and return mathjax string from input
 * @param expressions
 * @returns mathjax string
 */
const getMathjaxContent = (expressions) => {
    if (!expressions)
        return '';
    else if ('string' === typeof expressions)
        return expressions;
    else
        return expressions.latex ?? expressions.mathml ?? '';
};
/**
 * used to fix few issues with mathjax string in angular
 * @param  {string} jax mathjax string
 * @returns {string} fixed string
 */
const fixMathjaxBugs = (jax) => {
    return (jax
        //line break error
        .replace(/<br \/>/gi, '<br/> ')
        //automatic breakline
        .replace(/[$]([\s\S]+?)[$]/gi, (m, p, o, s) => {
        //return /s/gi.test(p)
        return p.includes('\\\\') && !p.includes('\\begin')
            ? `$\\begin{align*}${p}\\end{align*}$`
            : `$${p}$`;
    }));
};

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fixMathjaxBugs: fixMathjaxBugs,
    getMathjaxContent: getMathjaxContent,
    isMathjax: isMathjax
});

class MathjaxDirective {
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

class MathjaxModule {
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
MathjaxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule, deps: [{ token: RootMathjaxConfig }], target: i0.ɵɵFactoryTarget.NgModule });
MathjaxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule, declarations: [MathjaxDirective], exports: [MathjaxDirective] });
MathjaxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MathjaxModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MathjaxDirective],
                    exports: [MathjaxDirective],
                }]
        }], ctorParameters: function () { return [{ type: RootMathjaxConfig }]; } });

//

/*
 * Public API Surface of mathjax-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { utils as MathJaxUtils, MathjaxDirective, MathjaxModule };
//# sourceMappingURL=mathjax-angular.mjs.map
