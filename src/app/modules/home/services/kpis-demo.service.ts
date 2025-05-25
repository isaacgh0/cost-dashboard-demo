import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop'
import { pairwise } from 'rxjs';

type KpisDemoForm = 'kpisDemoForm';
export interface KpisProductsData {
    name: string, 
    total: number, 
    price: number,  
    quantity: number
}

export interface KpisFormValue {
    name: string;
    quantity: number;
    price: number;
}

export interface KpisProductsTotal{
    current: KpisProductsData[];
    previous: KpisProductsData[];
}

type KpisDemoFormValue = {
    products: KpisFormValue[][];
};

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

export interface CharsConfiguration {
    data: chartData;
    options: chartOptions;
    type: 'pie' | 'bar' | 'line' | 'doughnut'; 
    title: string; 
}

@Injectable({
    providedIn: 'root'
})
export class KpisDemoService {
    // * Inyeccion de dependencias.
    private readonly _fb = inject(FormBuilder);

    // * Atributos del servicio.
    public static productCount = 0;
    public forms: Record<KpisDemoForm, FormGroup> = {
        kpisDemoForm: this._fb.group({
            products: this._fb.array([]),
        })
    }
    public $form = toSignal<[KpisFormValue[], KpisFormValue[]]>(this.products.valueChanges.pipe(pairwise()));

        // * Debo crear dos arrays para manejar los charts en el primero ira el chart principal y en el segundo los charts secundarios.
        public $chartsArray = signal<CharsConfiguration[]>([]); 

        // * Constructor del servicio.
        constructor() {

            // Cargar desde localStorage
            this.loadProductsFromStorage();

            effect(() => {
                const data = this.$areDiferentProducts();
                if(data.areDiferent){
                    const matriz = data.matriz;
                    const currentProducts = matriz[1];

                    // ✅ Guardar en localStorage
                    this.saveProductsToStorage(currentProducts.map(p => ({
                        name: p.name,
                        price: p.price,
                        quantity: p.quantity
                    })));

                    if(currentProducts.length === 0) {
                        this.$chartsArray.set([]);
                        return;
                    }

                    const totalPriceChart: CharsConfiguration = (() => {
                        const labels = currentProducts.map(product => product.name);
                        const dataValues = currentProducts.map(product => product.total);

                        return {
                            data: {
                                labels: labels,
                                datasets: [{
                                    data: dataValues,
                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                                }]
                            },
                            options: {
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function (context: any) {
                                                const dataset = context.dataset;
                                                const total = dataset.data.reduce((sum: number, val: number) => sum + val, 0);
                                                const currentValue = dataset.data[context.dataIndex];
                                                const percentage = ((currentValue / total) * 100).toFixed(2);
                                                return `Total: ${currentValue}$ (${percentage}%)`;
                                            }
                                        }
                                    },
                                    legend: {
                                        labels: {
                                            usePointStyle: true,
                                            color: 'var(--text-color)'
                                        }
                                    }
                                }
                            },
                            type: 'doughnut',
                            title: 'Total de precios por producto'
                        };
                    })();

                    const totalQuantityChart: CharsConfiguration = (() => {
                        const labels = currentProducts.map(product => product.name);
                        const dataValues = currentProducts.map(product => product.quantity);

                        return {
                            data: {
                                labels: labels,
                                datasets: [{
                                    data: dataValues,
                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                                }]
                            },
                            options: {
                                plugins: {
                                    legend: {
                                        labels: {
                                            usePointStyle: true,
                                            color: 'var(--text-color)'
                                        }
                                    }
                                }
                            },
                            type: 'pie',
                            title: 'Cantidad total por producto'
                        };
                    })();

                    const priceChart: CharsConfiguration = (() => {
                        const labels = currentProducts.map(product => product.name);
                        const dataValues = currentProducts.map(product => product.price);

                        return {
                            data: {
                                labels: labels,
                                datasets: [{
                                    data: dataValues,
                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                                }]
                            },
                            options: {
                                plugins: {
                                    legend: {
                                        labels: {
                                            usePointStyle: true,
                                            color: 'var(--text-color)'
                                        }
                                    }
                                }
                            },
                            type: 'pie',
                            title: 'Precio por producto'
                        };
                    })();

                    // Guardar todos los charts en el array
                    this.$chartsArray.set([
                        totalPriceChart,
                        totalQuantityChart,
                        priceChart
                    ]);
                }
            });
        }
    
    // * Este computed me devolvera un array de objetos del tipo { name: string, total: number } el cual sera el nombre del producto y el total acumulado de ese producto.
    public $productsObjects = computed<[KpisProductsData[], KpisProductsData[]]>(() => {
        const formValue = this.$form();
        console.log('Form Value:', formValue);
        if(!formValue) return [[], []];
        const previousProducts = formValue[0];
        const currentProducts = formValue[1];
        const previousProductsNames = previousProducts.reduce((acc: KpisProductsData[], product) => {
            const name = product.name;
            const quantity = product.quantity;
            const price = product.price;
            if (name && quantity && price) {
                const total = Number(quantity) * Number(price);
                acc.push({ name, total, quantity, price });
            }
            return acc;
        }, [])
        const currentProductsNames = currentProducts.reduce((acc: KpisProductsData[], product) => {
            const name = product.name;
            const quantity = product.quantity;
            const price = product.price;
            if (name && quantity && price) {
                const total = Number(quantity) * Number(price);
                acc.push({ name, total, quantity, price });
            }
            return acc;
        }, []);
        return [previousProductsNames, currentProductsNames];
    })

    public $areDiferentProducts = computed<{areDiferent: boolean, matriz: [KpisProductsData[], KpisProductsData[]]}>(() => {
        const products = this.$productsObjects();
        console.log('Products:', products);
        if (!products) return {areDiferent: false, matriz: [[], []]};
        const previousProducts = products[0];
        const currentProducts = products[1];
        console.log('Previous Products:', previousProducts);
        console.log('Current Products:', currentProducts);
        return {areDiferent: JSON.stringify(previousProducts) !== JSON.stringify(currentProducts), matriz: products};
    });
    
    // * Metodos del servicio.
    public getForm(form: KpisDemoForm): FormGroup {
        return this.forms[form];
    }

    // * Metodos del formulario de los productos.
    
    public addProduct(): void {
        const products = this.products;
        const product = this._fb.group({
            name: [`Product default ${KpisDemoService.productCount++}`],
            quantity: [1, [Validators.required]],
            price: [10, [Validators.required]],
        });
        products.push(product);
    }

    public removeProduct(index: number): void {
        const products = this.products;
        if (products.length > 0) {
            products.removeAt(index);
        }
    }

    // * Getters y Setters.
    public get products(): FormArray {
        return this.getForm('kpisDemoForm').get('products') as FormArray;
    }
    public get productsArray(): FormGroup[] {
        return this.products.controls as FormGroup[];
    }


    // * Metodos local storage.
    private readonly LOCAL_STORAGE_KEY = 'kpis-products';

    private saveProductsToStorage(products: KpisFormValue[]): void {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(products));
    }

    private loadProductsFromStorage(): void {
        const raw = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        if (raw) {
            try {
                const parsed: KpisFormValue[] = JSON.parse(raw);
                parsed.forEach(product => {
                    this.products.push(this._fb.group({
                        name: [product.name],
                        quantity: [product.quantity, [Validators.required]],
                        price: [product.price, [Validators.required]],
                    }));
                    KpisDemoService.productCount++;
                });
            } catch (e) {
                console.error('Failed to parse products from localStorage', e);
            }
        }
    }
        
}