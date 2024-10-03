import { useEffect, useState } from "react";
import { AddProductForm } from "./components/AddProductForm";
import { Pagination } from "./components/Pagination";
import { ProductList } from "./components/ProductList";
import { SearchBar } from "./components/SearchBar";
import { SortBy } from "./components/SortBy";
import Button from "./components/Ui/Button";
import PopUp from "./components/Ui/Modal";
import {
  addNewProductToLocalStorage,
  applyFilters,
  applyPagination,
  getProductsFromLocalStorage,
} from "./helper/helper";
import { IProduct } from "./types/types";

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState(getProductsFromLocalStorage());
  const [searchTerm, setSearchTerm] = useState("");
  const [category] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 4;

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const filteredProducts = applyFilters(
    products,
    searchTerm,
    category,
    sortOption
  );
  const paginatedProducts = applyPagination(
    filteredProducts,
    currentPage,
    PRODUCTS_PER_PAGE
  );

  return (
    <div className=" md:px-10 px-4 mx-auto  my-[85px]">
      <div className="flex-col gap-2 lg:gap-0 flex lg:flex-row justify-between items-center mb-[43px]">
        <SearchBar onSearch={setSearchTerm} />
        <div className="flex gap-4">
          <SortBy onSort={setSortOption} />
          <div onClick={open}>
            <Button
              text="Sell item"
              plusIcon={true}
              className="bg-primary flex gap-2  justify-center items-center py-[11px] px-[23px] rounded "
            />
          </div>
        </div>
      </div>
      <ProductList products={paginatedProducts} setProducts={setProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
      <PopUp isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddProductForm
          onAddProduct={(newProduct: IProduct) => {
            addNewProductToLocalStorage(newProduct);
            setProducts([...products, newProduct]);
            close();
          }}
        />
      </PopUp>
    </div>
  );
};
