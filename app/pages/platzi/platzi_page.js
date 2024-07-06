export function PlatziPage() {
    const $content = /*html*/`
    <form action="" id="form" class="flex justify-center gap-2 my-3 w-50 h-auto">
       <input type="search" id="filter" placeholder="Buscar por título" class="bg-slate-400 text-white font-bold text-xl w-90 rounded-full p-2">
       <button type="submit" class="bg-black rounded-full p-3 text-white font-bold">Search</button>
    </form>
    <div id="container" class="grid grid-cols-4 gap-6 mt-12"></div>
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
                    <div class="bg-slate-950">
                    <img src="${product.images[0]}" alt="${product.title}" class>
                        <div class="my-6">
                            <h2 class="text-3xl my-5 text-white">${product.title}</h2>
                            <p class="mx-2 text-white">${product.description}</p>
                        </div>
                        <div>
                        <h3 class="text-3xl text-white">${product.price}$</h3>
                        </div>
                      
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
