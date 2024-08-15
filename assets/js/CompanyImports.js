export class CompanyImports {
    #companyId;
    #importsId;
    #products;
    #productsAmount;
    #unitPrice;

    constructor(companyId, importsId, products, productsAmount, unitPrice) {
        this.#companyId = companyId;
        this.#importsId = importsId;
        this.#products = products;
        this.#productsAmount = productsAmount;
        this.#unitPrice = unitPrice;
    }
    get companyId(){
        return this.#companyId;
    }

    set companyId(companyId) {
        this.#companyId = companyId;
    }

    get importsId() {
        return this.#importsId;
    }

    set importsId(importsId) {
        this.#importsId = importsId;
    }

    get products() {
        return this.#products;
    }

    set products(products) {
        this.#products = products;
    }

    get productsAmount() {
        return this.#productsAmount;
    }

    set productsAmount(productsAmount) {
        this.#productsAmount = productsAmount;
    }

    get unitPrice() {
        return this.#unitPrice;
    }

    set unitPrice(unitPrice) {
        this.#unitPrice = unitPrice;
    }
}