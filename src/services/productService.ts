import { Product, CreateProductDto, UpdateProductDto } from '../types';

// Simulação de banco de dados em memória
let products: Product[] = [
  { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
  { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
  { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
];

export const getAllProducts = async (): Promise<Product[]> => {
  return products;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return products.find(product => product.id === id);
};

export const createProduct = async (productData: CreateProductDto): Promise<Product> => {
  const newProduct: Product = {
    id: String(products.length + 1),
    name: productData.name,
    description: productData.description,
    price: productData.price,
    stock: productData.stock,
    category: productData.category
  };
  
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id: string, productData: UpdateProductDto): Promise<Product | null> => {
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return null;
  }
  
  products[productIndex] = {
    ...products[productIndex],
    ...productData,
    id: products[productIndex].id // Preserva o ID
  };
  
  return products[productIndex];
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return false;
  }
  
  products.splice(productIndex, 1);
  return true;
};

