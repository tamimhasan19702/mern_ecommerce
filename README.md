MERN Ecommerce

This is a full-stack ecommerce application developed using MERN stack. It allows users to browse, search, add to cart, purchase and review products. The application has two main user roles: customer and admin. Customers can browse and purchase products while admins can manage products, orders and customer reviews.


Technologies Used


MongoDB - Database

Express - Backend framework

React - Frontend framework

Node - Backend runtime

Redux - State management

Stripe - Payment gateway integration

Cloudinary - Cloud-based image and video management

React Bootstrap - Frontend UI framework


Key Features


User authentication and authorization using JWT

Product management (CRUD operations) for admins

Product search and filtering

Cart management (add, update and remove items)

Checkout process with Stripe integration

Order management (CRUD operations) for admins

Customer review and rating system


Installation

To run the application, follow these simple steps:



Clone the repository: git clone https://github.com/your-username/mern-ecommerce.git

Install the dependencies: cd mern-ecommerce && npm install

Configure the environment variables: Create a .env file in the root directory and add the following variables:


NODE_ENV=development
PORT=5000
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>


Start the application: npm run dev


Conclusion

Feel free to use this code as a starting point for your own ecommerce projects. If you find any issues or have any suggestions, please open an issue or create a pull request.