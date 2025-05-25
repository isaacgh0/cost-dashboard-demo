import { ChangeDetectorRef, Component, computed, effect, inject, PLATFORM_ID, Signal, signal } from '@angular/core';
import { CharsConfiguration, KpisDemoService, KpisProductsData } from '../services/kpis-demo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface chartData {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
    }[];
}

interface chartOptions {
    plugins: {
        legend: {
            labels: {
                usePointStyle: boolean;
                color: string;
            }
        }
    };
}

@Component({
    selector: 'app-kpis-demo',
    standalone: false,
    template: `
    <!-- @let pieChartTotalPrice = $charPieDataTotalPrice();
    @let pieChartQuantity = $charPieDataTotalQuantity();
    @let pieChartPrice = $charPieDataPrices(); -->

    <ng-container>
        <section>
            <div class="space-y-4">
                <section 
                    cdkDropList 
                    cdkDropListOrientation="mixed" 
                    (cdkDropListDropped)="onDrop($event)"
                    class="w-full flex flex-wrap justify-center gap-4 p-4"
                >
                    @for (chart of $charts(); track chart) {
                        <div cdkDrag class="lg:w-[calc(33.333%-16px)] sm:w-[calc(50%-16px)] w-full relative overflow-hidden">
                            <div class="absolute top-4 right-4 cursor-move h-6 w-6 bg-slate-300 rounded-xl text-black/75" cdkDragHandle>
                                <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path>
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                </svg>
                            </div>
                            <div class="custom-placeholder lg:w-[calc(33.333%-16px)] sm:w-[calc(50%-16px)] w-full" *cdkDragPlaceholder></div>
                            
                            <section class="w-full flex flex-col justify-center items-center gap-4">
                                <p-chart [type]="chart.type" [data]="chart.data" [options]="chart.options" class="w-fit" />
                                <h1>{{chart.title}}</h1>
                            </section>
                        </div>
                    }
                </section>
            </div>
            <div class="spce-y-4">
                <h1>Seccion donde iran los formularios de productos</h1>
                <p-button (click)="_KpisDemoService.addProduct()" severity="secondary" label="Agregar"/>
                <section>
                    <p-table [value]="products" [paginator]="true" [rows]="5" [responsiveLayout]="'scroll'" class="w-full" [tableStyle]="{'min-width': '50rem'}">
                        <ng-template #header>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-productForm let-i="rowIndex">
                            <tr [formGroup]="productForm">
                                <td>
                                    <input pInputText id="name" formControlName="name">
                                </td>
                                <td>
                                    <input pInputText type="number" id="quantity" formControlName="quantity">
                                </td>
                                <td>
                                    <input pInputText type="number" id="price" formControlName="price">
                                </td>
                                <td>
                                    <div class="w-full flex gap-4">
                                        <p-button severity="secondary" (onClick)="_KpisDemoService.removeProduct(i)" label="Eliminar Producto"/>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>
                </section>
            </div>
        </section>
    </ng-container>
    `
})
export class KpisDemoComponent {
    public readonly _KpisDemoService = inject(KpisDemoService);
    

    public form = this._KpisDemoService.getForm('kpisDemoForm');
    public products = this._KpisDemoService.productsArray;
    public $charts = computed(() => this._KpisDemoService.$chartsArray());

    constructor() { 
        this.form.valueChanges.subscribe((value) => console.log(value));

        // this.form.valueChanges.subscribe((value) => console.log(value));
    }

    public onDrop(event: CdkDragDrop<CharsConfiguration[]>): void {
        moveItemInArray(this.$charts(), event.previousIndex, event.currentIndex);
    }
}
