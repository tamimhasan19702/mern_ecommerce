<h1>MERN Ecommerce </h1>

<p>This is a full-stack ecommerce application developed using MERN stack. It allows users to browse, search, add to cart, purchase and review products. The application has two main user roles: customer and admin. Customers can browse and purchase products while admins can manage products, orders and customer reviews.
</p>

<h4>Technologies Used</h4>

<ul>
<li>MongoDB - Database</li>
<li>Express - Backend framework</li>
<li>React - Frontend framework</li>
<li>Node - Backend runtime</li>
<li>Redux - State management</li>
<li>Stripe - Payment gateway integration</li>
<li>Cloudinary - Cloud-based image and video management</li>
<li>React Bootstrap - Frontend UI framework</li>
</ul>

<h4>Key Features</h4>

<ul>
<li>User authentication and authorization using JWT </li>
<li>Product management (CRUD operations) for admins </li>
<li>Product search and filtering</li>
<li>Cart management (add, update and remove items) </li>
<li>Checkout process with Stripe integration </li>
<li>Order management (CRUD operations) for admins </li>
<li>Customer review and rating system </li>
</ul>

<h4>Installation</h4>

<p>To run the application, follow these simple steps:

Clone the repository: git clone https://github.com/your-username/mern-ecommerce.git

Install the dependencies: cd mern-ecommerce && npm install

Configure the environment variables: Create a .env file in the root directory and add the following variables:
</p>

<code>
NODE_ENV=development
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
</code>

Start the application: npm run dev

Conclusion

Feel free to use this code as a starting point for your own ecommerce projects. If you find any issues or have any suggestions, please open an issue or create a pull request.
