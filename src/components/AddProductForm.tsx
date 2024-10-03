import { ChangeEvent, FormEvent, useState } from "react";

// Define the type for the props
interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

// Define the type for the product
interface Product {
  id: number;
  name: string;
  describe: string;
  price: number;
  category: string;
  image: string | null;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  onAddProduct,
}) => {
  const [name, setName] = useState<string>("");
  const [describe, setDescribe] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Type assertion to string
      };
      reader.readAsDataURL(file);
      setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors: { [key: string]: string } = {};

    if (!name) formErrors.name = "Please enter a title for the item.";
    if (!describe) formErrors.describe = "Please describe the item.";
    if (!price || isNaN(Number(price)) || parseFloat(price) <= 0)
      formErrors.price = "Please enter a valid price greater than 0.";
    if (!image) formErrors.image = "Please upload an image.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      describe,
      price: parseFloat(price),
      category,
      image,
    };

    const existingProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    localStorage.setItem(
      "products",
      JSON.stringify([...existingProducts, newProduct])
    );

    onAddProduct(newProduct);

    setName("");
    setCategory("");
    setDescribe("");
    setPrice("");
    setImage(null);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <div>
        <p className="text-sm mb-2">Upload photos</p>
        <div className="flex items-center justify-center w-full md:h-44 h-36 border rounded">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center text-[14px] p-3 border border-primary rounded cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full md:h-36 h-24 object-cover rounded"
              />
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-gray-600">Upload photo</p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      <div>
        <p className="mb-2 text-sm">Title</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border p-2 rounded w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
            errors.name ? "border-red-500" : ""
          }`}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <p className="mb-2 text-sm">Category</p>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`border p-2 rounded w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
            errors.category ? "border-red-500" : ""
          }`}
          required
        >
          <option value="">Select</option> {/* Default option */}
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="home-appliances">Home Appliances</option>
          <option value="sports">Sports</option>
          <option value="beauty">Beauty</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm">Describe your item</p>
        <textarea
          value={describe}
          onChange={(e) => setDescribe(e.target.value)}
          className={`border p-2 rounded w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${
            errors.describe ? "border-red-500" : ""
          }`}
          required
        />
        {errors.describe && (
          <p className="text-red-500 text-sm">{errors.describe}</p>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm">Item price</p>
        <div
          className={`flex items-center border rounded-md p-2 w-full ${
            errors.price ? "border-red-500" : ""
          }`}
        >
          <span className="text-xl pr-2">£</span>
          <input
            type="number"
            placeholder="00.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full outline-none text-right"
            step="0.01"
            min="0"
            required
          />
        </div>
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <button type="submit" className="bg-primary text-[14px] p-3 rounded mt-4">
        Upload item
      </button>
    </form>
  );
};
