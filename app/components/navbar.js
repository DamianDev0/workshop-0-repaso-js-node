import 'boxicons';
import '../../global.css'
import styles from './nav.css'
export function NavBarLayout($content, logic) {
  const $navbar = /*html*/ `
    <nav class="${styles['navbar']}">
      <ul class="${styles['navContainer']}">
        <li><a href="/"><box-icon name='check-square'></box-icon></a></li>
        <li><a href="/second-exercise"><box-icon type='solid' name='graduation'></box-icon></a></li>
        <li><a href="/third-exercise"><box-icon type='solid' name='data'></box-icon></a></li>
        <li><a href="/fourth-exercise"><box-icon name='store-alt' type='solid' ></box-icon></a></li>
      </ul>
    </nav>
  `;
  
  document.getElementById('root').innerHTML = /*html*/ `
    ${$navbar}
    ${$content}
  `;

  logic();
}
