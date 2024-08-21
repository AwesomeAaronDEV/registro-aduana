export class Company {
    #registerId;
    #name;
    #rut;

    constructor(registerId, name, rut) {
        this.#registerId = registerId;
        this.#name = name;
        this.#rut = rut;
    }

    get registerId() {
        return this.#registerId;
    }

    set registerId(registerId) {
        this.#registerId = registerId;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    get rut() {
        return this.#rut;
    }

    set rut(rut) {
        this.#rut = rut;
    }
}