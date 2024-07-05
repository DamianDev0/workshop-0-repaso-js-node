import '../../../global.css'

export function ApiJsonPlaceholder() {
    const $content = /*html*/`
      <button id="display" classname="bg-orange-500">Fetch Posts</button>
      <div id="container-posts">
      </div>
   
      
    `;

    
    const logic = async () => {
      const container = document.getElementById('container-posts')
      const btn = document.getElementById('display')

      btn.addEventListener('click', async () =>{
        
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const posts = await response.json();
      console.log(posts)

      posts.forEach((post) => {
        const postElement = document.createElement('DIV');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
        `;
        container.appendChild(postElement);
      });
      })
    
    };
    
    return {
      $content,
      logic
    };
  }
  