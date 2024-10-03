// src/types.ts

export interface IProduct {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string | null;
    fav?: boolean;
}

export interface AddProductFormProps {
    onAddProduct: (newProduct: IProduct) => void;
}

export interface ProductListProps {
    products: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}
export interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}
export interface Option {
    value: string;
    label: string;
}

export interface SortByProps {
    onSort: (value: string) => void;
}