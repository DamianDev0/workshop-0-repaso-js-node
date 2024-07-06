export function Methods() {
    const $content = /*html*/ `
    <h1>Welcome to my store</h1>
    <div class="flex justify-around my-4">
        <button id="show" class="bg-zinc-700 text-white font-bold p-4 rounded-full">Mostrar todos los productos</button>
        <button id="calculate" class="bg-zinc-700 text-white font-bold p-4 rounded-full">Calcular el precio total</button>
        <button id="searchByName" class="bg-zinc-700 text-white font-bold p-4 rounded-full">Buscar productos por nombre</button>
        <button id="searchByCategory" class="bg-zinc-700 text-white font-bold p-4 rounded-full">Buscar producto por categoría</button>
        <button id="avaliable" class="bg-zinc-700 text-white font-bold p-4 rounded-full">Verificar disponibilidad de productos</button>
        <button id="getNamesProduct" class="bg-zinc-700 text-white font-bold p-4 rounded-full">Obtener Nombres de Productos</button>
    </div>
    <div id="container" class="grid grid-cols-4 gap-2 border"></div>
    `;

    const logic = () => {
        const products = [
            { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
            { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
            { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
            { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
            { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
            { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
            { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
            { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
            { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
        ];

        const $container = document.getElementById('container');

        const showProductsBtn = document.getElementById('show');
        const calculateProductsBtn = document.getElementById('calculate');
        const searchByNameBtn = document.getElementById('searchByName');
        const searchByCategoryBtn = document.getElementById('searchByCategory');
        const avaliableBtn = document.getElementById('avaliable');
        const getNamesProductBtn = document.getElementById('getNamesProduct');

        showProductsBtn.addEventListener('click', () => {
            $container.innerHTML = '';
            products.forEach(p => {
                $container.innerHTML += /*html*/ `
                    <div key=${p.id}>
                        <h1>${p.name}</h1>
                        <p>Categoría: ${p.category}</p>
                        <p>Precio: ${p.price}</p>
                        <p>Disponibles: ${p.stock}</p>
                    </div>
                `;
            });
        });

        calculateProductsBtn.addEventListener('click', () => {
            const totalValue = products.reduce((acumulador, valorAcu) => {
                return acumulador + valorAcu.price;
            }, 0);

            $container.innerHTML = '';
            $container.innerHTML += /*html*/ `
                <p>El valor total es de: ${totalValue}</p>
            `;
        });

        searchByNameBtn.addEventListener('click', () => {
            $container.innerHTML = '';
            $container.innerHTML = /*html*/ `
                <form id="searchForm">
                    <label for="search" class="text-2xl">Buscar producto por nombre</label>
                    <input type="search" id="search" class="bg-zinc-800 p-1 text-white rounded-full">
                    <input type="submit" class="mx-2 p-3 bg-black text-white rounded-full">
                </form>
                <div id="filterContainer"></div>
            `;

            const $form = document.getElementById('searchForm');
            const inputUserSearch = document.getElementById('search');
            const $filter = document.getElementById('filterContainer');

            $form.addEventListener('submit', e => {
                e.preventDefault();
                const foundProd = products.filter(product => product.name.toLowerCase().includes(inputUserSearch.value.toLowerCase()));

                $filter.innerHTML = '';
                foundProd.forEach(product => {
                    $filter.innerHTML += /*html*/ `
                        <div key=${product.id}>
                            <h1>${product.name}</h1>
                            <p>Categoría: ${product.category}</p>
                            <p>Precio: ${product.price}</p>
                            <p>Disponibles: ${product.stock}</p>
                        </div>
                    `;
                });
            });
        });

        searchByCategoryBtn.addEventListener('click', () => {
            $container.innerHTML = '';
            $container.innerHTML = /*html*/ `
                <form id="searchForm">
                    <label for="search" class="text-2xl">Buscar producto por categoría</label>
                    <input type="search" id="search" class="bg-zinc-800 p-1 text-white rounded-full">
                    <input type="submit" class="mx-2 p-3 bg-black text-white rounded-full">
                </form>
                <div id="filterContainer"></div>
            `;

            const $form = document.getElementById('searchForm');
            const inputUserSearch = document.getElementById('search');
            const $filter = document.getElementById('filterContainer');

            $form.addEventListener('submit', e => {
                e.preventDefault();
                const foundProd = products.filter(product => product.category.toLowerCase().includes(inputUserSearch.value.toLowerCase()));

                $filter.innerHTML = '';
                foundProd.forEach(product => {
                    $filter.innerHTML += /*html*/ `
                        <div key=${product.id}>
                        <div>
                        <h1>${product.name}</h1>
                            <p>Categoría: ${product.category}</p>
                            <p>Precio: ${product.price}</p>
                            <p>Disponibles: ${product.stock}</p>
                        </div>
                            
                        </div>
                    `;
                });
            });
        });

        avaliableBtn.addEventListener('click', () => {
            $container.innerHTML = '';

            const availableProducts = products.filter(product => product.stock > 0);

            if (availableProducts.length > 0) {
                availableProducts.forEach(p => {
                    $container.innerHTML += /*html*/ `
                        <div key=${p.id}>
                            <h1>${p.name}</h1>
                            <p>Categoría: ${p.category}</p>
                            <p>Precio: ${p.price}</p>
                            <p>Disponibles: ${p.stock}</p>
                        </div>
                    `;
                });
            } else {
                alert('No hay productos disponibles');
            }
        });

        getNamesProductBtn.addEventListener('click', () => {
            $container.innerHTML = '';
            
            products.forEach(p => {
                $container.innerHTML += /*html*/ `
                    <div>
                        <h1>${p.name}</h1>
                    </div>
                `;
            });
        });
    };

    return {
        $content,
        logic
    };
}
