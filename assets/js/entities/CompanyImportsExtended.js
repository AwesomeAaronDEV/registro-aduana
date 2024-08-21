import { CompanyImports } from './CompanyImports.js';

export class CompanyImportsExtended extends CompanyImports {
    #rubro;
    #tamaño;
    #importCategory; 

    constructor(companyId, importsId, products, productsAmount, unitPrice, rubro, tamaño, importCategory) {
        super(companyId, importsId, products, productsAmount, unitPrice);
        this.#rubro = rubro;
        this.#tamaño = tamaño;
        this.#importCategory = importCategory;
    }

    get rubro() {
        return this.#rubro;
    }

    set rubro(rubro) {
        this.#rubro = rubro;
    }

    get tamaño() {
        return this.#tamaño;
    }

    set tamaño(tamaño) {
        this.#tamaño = tamaño;
    }

    get importCategory() {
        return this.#importCategory;
    }

    set importCategory(importCategory) {
        this.#importCategory = importCategory;
    }
}

