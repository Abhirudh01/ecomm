import { showProductContainer} from './homeProductCards.js';


fetch('/api/products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load JSON: ${response.status}`);
    }
    return response.json();
  })
  .then(products => {
    showProductContainer(products);
    // console.log(products); 
  })
  .catch(error => console.error('Error fetching JSON:', error));



 


