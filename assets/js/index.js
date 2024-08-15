import { Company } from './Company.js';
import { CompanyImports } from './CompanyImports.js';

let companies = [];
let imports = [];
let companyCounter = 1;
let importCounter = 1;

//Funciones para crear un valor incremental
function generateCompanyId(){
    return companyCounter++;
}
function generateImportsId(){
    return importCounter++;
}

function mostrarTabla (){
    var tabla = document.getElementById('tablaProductos');
    tabla.style.setProperty('display', 'block', 'important');
}

function registerCompany(event) {
    event.preventDefault();

    // 1. Carga de los datos desde el DOM
    const companyId = generateCompanyId();
    const companyName = document.getElementById('company-name').value;
    const companyRut = document.getElementById('company-rut').value;

    //2. Crear una instancia de Company, y lo agregamos al array
    const company = new Company(companyId, companyName, companyRut);
    companies.push(company);
    console.log('Empresa registrada:', company);

    //3. Agregar la nueva empresa al Dropdown
    const newElement = document.createElement('option');
    newElement.setAttribute('value', companyId);
    newElement.innerHTML = companyName;
    document.getElementById('company-id-ref').appendChild(newElement);

    //4. Agregar la empresa al DOM

    let empresa = `<div class="card p-4 bg-primary text-light"><p class="fs-5 mb-1">Empresa registrada con éxito</p>ID Empresa: ${company.registerId}<br> Nombre: ${company.name}<br>Rut: ${company.rut}</div>`;
     document.getElementById('company-loaded').innerHTML = empresa;
}

function registerProduct(event) {
    event.preventDefault();

    //1. Carga de los datos desde el DOM
    const companyIdRef = document.getElementById('company-id-ref').value;
    const importsId = generateImportsId();
    const productName = document.getElementById('product-name').value;
    const productsAmountRaw = document.getElementById('product-amount').value;
    const unitPriceRaw= document.getElementById('unit-price').value;

    const productsAmount = parseInt(productsAmountRaw);
    const unitPrice = parseInt(unitPriceRaw);

    //2. Crea una instancia de CompanyImports, y lo agraga al array
    const companyImports = new CompanyImports(companyIdRef, importsId, productName, productsAmount, unitPrice);
    imports.push(companyImports);

    console.log('Producto registrado:', companyImports);

    //4. Agregar el producto al DOM

    mostrarTabla();

    let products = { idImportadora: companyImports.companyId, iDProducto: companyImports.importsId, 
    Producto: companyImports.products, cantidadIngresada: companyImports.productsAmount, valorUnidad: companyImports.unitPrice};
    //4. Agregar el producto al DOM
    const tbody = document.getElementById('product-loaded');
    let fila = document.createElement('tr');

    for (let clave in products) {
        let celda = document.createElement('td');
        celda.textContent = products[clave]; // itera sobre las llaves
        fila.appendChild(celda); 
    }
    
    tbody.appendChild(fila);
}
function sumTotalProductImportPrice(){
    const totalProduct = imports.reduce((accumulator, imports) => {
        return accumulator + (imports.productsAmount)
    }, 0)
    const totalPrice = imports.reduce((accumulator, imports) => {
        return accumulator + (imports.unitPrice * imports.productsAmount)
    }, 0)

    const totalAmountimport = imports.length;
    const writeAmount = document.getElementById('total-import-write');
    const writeTotalImports = document.getElementById('total-product-write');

    writeAmount.innerHTML = `Total importaciones: ${totalAmountimport} <br>`;
    writeTotalImports.innerHTML = `Total importaciones: ${totalProduct} <br> Valor total importaciones: ${totalPrice}`;
}

document.getElementById('company-form').addEventListener('submit', registerCompany);
document.getElementById('products-form').addEventListener('submit', registerProduct);

document.getElementById('total-imports').addEventListener('click', sumTotalProductImportPrice);

/*const suma = numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);*/
