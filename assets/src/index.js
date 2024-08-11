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
    const companyList = document.getElementById('company-loaded');
    const li = document.createElement('li');
    li.textContent = `ID: ${company.registerId}, Nombre: ${company.name}, Rut: ${company.rut}`;
    companyList.appendChild(li);
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
    const companyList = document.getElementById('product-loaded');
    const li = document.createElement('li');
    li.textContent = `ID Importadora: ${companyImports.companyId}, ID Producto: ${companyImports.importsId}, 
    Producto: ${companyImports.products}, Cantidad Ingresada: ${companyImports.productsAmount}, Precio por unidad: ${companyImports.unitPrice}`;
    companyList.appendChild(li);
}

document.getElementById('company-form').addEventListener('submit', registerCompany);
document.getElementById('products-form').addEventListener('submit', registerProduct);

