
<!-- Product Management App -->
This is a product management web application built using React. The app allows users to browse, search, filter, sort, paginate, and add new products to a local storage-based product list.

<!-- Features -->

Product Listing: Displays a list of products from local storage.
Search: Users can search for products by name.
Category Filtering: Products can be filtered by category.
Sorting: Sort products based on predefined options.
Pagination: Display products in a paginated format.
Add New Product: Allows users to add new products via a form that opens in a modal.
Favorite Products: Users can mark products as favorites (implemented with local storage).
Responsive Design: Layout adjusts for mobile and desktop views.

<!-- Tech Stack -->
React: UI library for building the app.
TypeScript: Strongly typed superset of JavaScript used for type safety.
Tailwind CSS: Utility-first CSS framework for styling.
LocalStorage: Used to persist product data.
.
├── public
├── src
│   ├── assets          # Image assets
│   ├── components      # Reusable components
│   ├── helper          # Helper functions for filtering, pagination, etc.
│   ├── App.tsx         # Main app component
│   ├── index.tsx       # App entry point
│   └── styles          # Global styles
├── README.md           # Project documentation
└── package.json        # Project dependencies and scripts
