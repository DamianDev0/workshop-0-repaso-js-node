export function PlatziPage() {
    const $content = /*html*/`
    <form action="" id="form">
       <input type="search" id="filter" placeholder="Buscar por título">
       <button type="submit">Buscar</button>
    </form>
    <div id="container"></div>
    `;
    
    const logic = async () => {
        const $container = document.getElementById('container');
        const $search = document.getElementById('filter');
        const $form = document.getElementById('form');

        const fetchProducts = async (filter = '') => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${filter}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
                return [];
            }
        };

        const products = (products) => {
            $container.innerHTML = ''; // Clear previous products
            products.forEach((product) => {
                const productHTML = /*html*/`
                    <div>
                        <h2>${product.title}</h2>
                        <p>$ {product.description}</p>
                        <h3>${product.price}</h3>
                        <img src="${product.images[0]}" alt="${product.title}">
                    </div>
                `;
                $container.innerHTML += productHTML;
            });
        };

        const data = await fetchProducts(); // Fetch and render initial product list
        products(data);

        $form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const searchParam = $search.value;
            const filteredProducts = await fetchProducts(searchParam);
            products(filteredProducts);
        });
    };

    return {
        $content,
        logic
    };
}
