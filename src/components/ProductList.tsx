import { CiHeart } from "react-icons/ci"; 
import avatar from "../assets/Rectangle (1).png";
import imageNotFound from "../assets/noProducts.png"; 
import { IoMdHeart } from "react-icons/io";
import { IProduct, ProductListProps } from "../types/types";


const updateProductInLocalStorage = (updatedProduct: IProduct) => {
  const storedProducts = localStorage.getItem("products");
  const products: IProduct[] = storedProducts ? JSON.parse(storedProducts) : [];

  const updatedProducts = products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );

  localStorage.setItem("products", JSON.stringify(updatedProducts));
};


export const ProductList: React.FC<ProductListProps> = ({ products, setProducts }) => {


  const handleToggleFavorite = (product: IProduct) => {
    const updatedProduct = { ...product, fav: !product.fav }; 
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === product.id ? updatedProduct : p))
    );
    updateProductInLocalStorage(updatedProduct);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7">
      {products.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center h-full">
          <img src={imageNotFound} alt="No Products Found" className="w-1/4 h-auto" />
          <p className="text-center mt-5 md:text-xl text-lg lg:text-2xl text-gray-500">There are no products.</p>
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="">
            <section className="block">
              <img
                alt={product?.name}
                src={product?.image || ''}
                className="h-[326px] w-full object-cover sm:h-80 lg:h-96 rounded"
              />
              <div className="flex justify-between items-center mt-[10px]">
                <div>
                  <p className="text-[13px] font-[300] leading-[15px] text-[#171717]">
                    {product.name}
                  </p>
                  <p className="leading-[26px] font-semibold text-[#171717]">£{product.price}</p>
                </div>
                <div
                  className="border rounded-[4px] w-[36px] h-[36px] flex justify-center items-center cursor-pointer"
                  onClick={() => handleToggleFavorite(product)}
                >
                  {product.fav ? (
                    <IoMdHeart className="w-[22px] h-[22px] text-red-500" />
                  ) : (
                    <CiHeart className="w-[22px] h-[22px]" /> 
                  )}
                </div>
              </div>
              <div className="flex gap-2 items-center mt-[5px]">
                <img src={avatar} width={20} height={20} alt="Avatar" />
                <p className="text-[10px] font-[500]">Josie Parker</p>
              </div>
            </section>
          </div>
        ))
      )}
    </div>
  );
};
