import express from 'express';
import ProductsController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import validationMiddleware from './src/middleware/validation.middleware.js';
import { fileUpload } from './src/middleware/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';
const app = express();
const productsController =
  new ProductsController();
 const userController = new UserController(); 
app.use(session({
  secret:'SecretKey',
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false},
}))
app.use(cookieParser());
// app.use(setLastVisit);
app.use(ejsLayouts);
app.use(express.static('src/views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'src', 'views')
);

app.get('/',setLastVisit,auth, productsController.getProducts);
app.get(
  '/add-product',auth,
  productsController.getAddProduct
);
app.get(
  '/update-product/:id',auth,
  productsController.getUpdateProductView
);
app.post('/delete-product/:id',auth, productsController.deleteProduct);

app.post('/',auth,fileUpload.single('imageUrl'),validationMiddleware, productsController.postAddProduct);
app.post(
  '/update-product',auth,
  productsController.postUpdateProduct
);
app.get('/register',userController.getRegister);
app.get('/login',userController.getLogin);
app.post('/register',userController.postRegister);
app.post('/login',userController.postLogin);
app.get('/logout',userController.logout);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
