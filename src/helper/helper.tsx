import { IProduct } from "../types/types";

export const getProductsFromLocalStorage = (): IProduct[] => {
  const products = localStorage.getItem("products");
  return products ? JSON.parse(products) : [];
};

export const addNewProductToLocalStorage = (newProduct: IProduct): void => {
  const products: IProduct[] = getProductsFromLocalStorage();
  const updatedProducts: IProduct[] = [...products, newProduct];
  localStorage.setItem("products", JSON.stringify(updatedProducts));
};

export const applyFilters = (
  products: IProduct[],
  searchTerm: string,
  category: string,
  sortOption: string
): IProduct[] => {
  let filteredProducts: IProduct[] = [...products];

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (sortOption === "price-asc") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filteredProducts = filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if (sortOption === "name-desc") {
    filteredProducts = filteredProducts.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return filteredProducts;
};

export const applyPagination = (
  products: IProduct[],
  currentPage: number,
  pageSize: number = 4
): IProduct[] => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return products.slice(startIndex, endIndex);
};

export const getAllCategories = (products: IProduct[]): string[] => {
  const categories: string[] = products.map(
    (product: IProduct) => product.category
  );
  return [...new Set(categories)];
};
