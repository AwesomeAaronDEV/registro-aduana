let companies = [];
let imports = [];
let companyCounter = 1;
let importCounter = 1;

let companySizeQualify = {
    1: "Pequeña",
    2: "Mediana",
    3: "Gran Empresa"
}

let importQualify = {
    1: "Aprobado",
    2: "Pendiente",
    3: "Rechazado"
}

function generateCompanyId() {
    return companyCounter++;
}

function generateImportId() {
    return importCounter++;
}

function mostrarMensaje(mensaje) {
    alert(mensaje);
}

function registerCompany(event) {
    event.preventDefault();

    const companyName = document.getElementById('company-name').value;
    const companyRut = document.getElementById('company-rut').value;
    const companySizeRaw = document.getElementById('company-size').value;

    const companySizeQ = parseInt(companySizeRaw, 10);

    if (companyName === '' || companyRut === '' || companySizeQ == 0) {
        mostrarMensaje('Por favor, complete todos los campos de la compañía.');
        return;
    }

    let companySize = companySizeQualify[companySizeQ];

    const companyId = generateCompanyId();
    const newCompany = { id: companyId, name: companyName, rut: companyRut, size: companySize };
    companies.push(newCompany);

    alert("Compañía creada correctamente.");

    const companySelect = document.getElementById('company-id-ref');
    const newOption = document.createElement('option');
    newOption.value = companyId;
    newOption.textContent = companyName;
    companySelect.appendChild(newOption);

    document.getElementById('company-form').reset();
}

function registerProduct(event) {
    event.preventDefault();

    /*
    * TODO:
    *  productrubro se valide como numerico y valor de productRubro setee el estado de la importacion
    * */

    const companyIdRaw = document.getElementById('company-id-ref').value;
    const productName = document.getElementById('product-name').value;
    const productAmountRaw = document.getElementById('product-amount').value;
    const unitPrice = document.getElementById('unit-price').value;
    const productRubroRaw = document.getElementById('product-rubro').value;

    const companyId = parseInt(companyIdRaw, 10);
    const productRubro = parseInt(productRubroRaw, 10);
    const productAmount = parseInt(productAmountRaw, 10);
    let importCategory = "";


    if (productRubro != 0) {
        if (productRubro == 1 || productRubro == 5 || productRubro == 7) {
            importCategory = importQualify[1];
        } else if (productRubro == 3 || productRubro == 4 || productRubro == 6 ) {
            importCategory = importQualify[2];;
        } else if (productRubro == 2) {
            importCategory = importQualify[3];;
        }
    } else {
        mostrarMensaje('Por favor, seleccione un rubro.');
        return;
    }

    if (companyId === '' || productName === '' || productAmount === '' || unitPrice == 0) {
        mostrarMensaje('Por favor, complete todos los campos requeridos.');
        return;
    }

    const importRecord = {
        id: generateImportId(),
        companyId: parseInt(companyId),
        productName: productName,
        productAmount: productAmount,
        unitPrice: unitPrice,
        productRubro: productRubro,
        importCategory: importCategory
    };
    imports.push(importRecord);

    alert("Producto registrado correctamente.");

    displayProducts();
    displayImportTable();

    document.getElementById('products-form').reset();
}

function displayProducts() {
    const productTableBody = document.getElementById('product-loaded');
    productTableBody.innerHTML = '';

    for (let i = 0; i < imports.length; i++) {
        let product = imports[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.companyId}</td>
            <td>${product.id}</td>
            <td>${product.productName}</td>
            <td>${product.productAmount}</td>
            <td>${product.unitPrice}</td>
            <td>${product.productRubro}</td>
            <td>${product.importCategory}</td>
        `;
        productTableBody.appendChild(tr);
    }
}

function displayImportTable() {
    const importTableBody = document.getElementById('import-table-body');
    importTableBody.innerHTML = '';

    for (let i = 0; i < imports.length; i++) {
        const product = imports[i];
        const company = findCompanyById(product.companyId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${company ? company.id : 'No disponible'}</td>
            <td>${company ? company.name : 'No disponible'}</td>
            <td>${company ? company.rut : 'No disponible'}</td>
            <td>${company ? company.size : 'No disponible'}</td>
            <td>${product.id}</td>
            <td>${product.productName}</td>
            <td>${product.productAmount}</td>
            <td>${product.unitPrice}</td>
            <td>${product.productRubro}</td>
            <td>${product.importCategory}</td>
        `;
        importTableBody.appendChild(tr);
    }
}

function findCompanyById(companyId) {
    for (let i = 0; i < companies.length; i++) {
        if (companies[i].id === companyId) {
            return companies[i];
        }
    }
    return null;
}

function filterProducts(event) {
    event.preventDefault();

    const filterCategory = document.getElementById('filter-category').value;
    const filterMatch = importQualify[filterCategory];

    const filteredImports = [];
    for (let i = 0; i < imports.length; i++) {
        if (imports[i].importCategory === filterMatch) {
            filteredImports.push(imports[i]);
        }
    }

    const productTableBody = document.getElementById('product-loaded');
    productTableBody.innerHTML = '';

    for (let i = 0; i < filteredImports.length; i++) {
        let product = filteredImports[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.companyId}</td>
            <td>${product.id}</td>
            <td>${product.productName}</td>
            <td>${product.productAmount}</td>
            <td>${product.unitPrice}</td>
            <td>${product.productRubro}</td>
            <td>${product.importCategory}</td>
        `;
        productTableBody.appendChild(tr);
    }
}

document.getElementById('company-form').addEventListener('submit', registerCompany);
document.getElementById('products-form').addEventListener('submit', registerProduct);
document.getElementById('filter-form').addEventListener('submit', filterProducts);
