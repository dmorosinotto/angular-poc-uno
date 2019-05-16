import { ViewContainerRef, Component, ViewChild, AfterViewInit, TemplateRef, Input, OnDestroy, EmbeddedViewRef, ComponentFactory} from "@angular/core";
import { mytableComponent } from './mytableComponent';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { AnagraficaPage } from '../anagrafica/anagrafica-page/anagrafica.page';

@Component({
    selector: "mydynamic",
    template: `
        <h1>Titolo sopra</h1>

        <ng-container #puthere></ng-container>
        <button (click)="istanziaTpl()">Istanzia Random</button>

        <footer>... (C) 2019</footer>
        <ng-template #tpl1 let-pippo let-a="a">
            <div>
                <img *ngIf="pippo" src="pippo.image" (click)="pippo.handle($event)">
                <mytable [data]="pippo.data"></mytable>
            </div>
        <ng-template>

        <ng-template #tpl2 let-pippo="$implict" let-pluto="pluto" let-a="a">
            <div>
                <img *ngIf="pluto" src="pippo.image">
                <h2>NO TABLE HERE</h2>
            </div>
        <ng-template>
    `
})
export class mydynamicComponent implements AfterViewInit, OnDestroy {
    
    @ViewChild('puthere', {read: ViewContainerRef}) vcr: ViewContainerRef;
    @ViewChild('tpl1') mytemplate1: TemplateRef<any>;
    @ViewChild('tpl2') mytemplate2: TemplateRef<any>;
    @Input() tpl: TemplateRef<{ $implict: { image: string, data: any, handle: (x:any)=>void }  }>
    private _view: EmbeddedViewRef<any>; 
    constructor(private cfr: ComponentFactoryResolver) {
        console.log("Ctor", this.vcr); //UNDEFINED TROPPO PRESTO!!!!
    }

    ngOnInit() {
        console.log("OnInit", this.vcr); //UNDEFINED TROPPO PRESTO!!!!
    }

    ngAfterViewInit() {
        //QUI AVETE ACCESSO A vcr -> ViewContainerRef valido/istanziato!
        //this._view = this.vcr.createEmbeddedView(this.mytemplate2); //EQUIVALE A pippo=undefined
    }

    istanziaTpl() {
        const rnd = Math.random();

        this.tpl  = rnd > 0.5 ? this.mytemplate1 : this.mytemplate2;

        if (this._view) this._view.destroy();
        this._view = this.vcr.createEmbeddedView(this.tpl, { pippo: { image: "/asset/" + rnd + ".jpg" , data: [ rnd,  2*rnd, 3*rnd ], handle: this.handleClick } }  )
        
        var cf =   this.cfr.resolveComponentFactory(mytableComponent)
        var cmp = this.vcr.createComponent( cf,  );
        cmp.instance.selected.subscribe(this.handleClick);
        cmp.destroy();
    }

    handleClick(e:any) {
        alert(e);
    }

    ngOnDestroy() {
        if (this._view) this._view.destroy();
    }
}