// PAQUETES Y MODULOS

import express, { urlencoded } from 'express';
import __dirname from './utils.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import config from './config.js';

// RUTAS

import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import viewsRouter from "./routes/views.router.js"
import userRouter from "./routes/session.router.js"
import msmRouter from "./routes/message.router.js"
import ticketRouter from "./routes/ticket.router.js";
import mockRouter from './routes/mock.router.js'
import errorMiddleware from './routes/errors/error.middleware.js';

// CONTROLLERS

import ViewsController from './controllers/viewsController.js';

// PASSPORT
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initializePassportLocal } from './config/local.passport.js';
import { initializePassportGitHub } from './config/gitHub.passport.js';
import { initializePassportJWT } from './config/jwt.passport.js';

// SERVER EXPRESS

const app = express();

// MONGOOSE

const connection = mongoose.connect(
  config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MIDDLEWARES

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(errorMiddleware);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


// PASSPORT

app.use(cookieParser());
app.use(passport.initialize());
initializePassportJWT();
initializePassportGitHub();
initializePassportLocal();

// SERVER HTTP EXPRESS

const expressServer = app.listen(config.PORT, () => {
  console.log(`Servidor levantado en el puerto ${config.PORT}`);
})

// SERVER SOCKET.IO

const socketServer = new Server(expressServer)

// VIEWS CONTROLLER

let viewsController = new ViewsController;

// SERVER SOCKET.IO EVENTS

socketServer.on("connection", async (socket) => {
  console.log("¡Nuevo cliente conectado!", socket.id)
  
  // PRODUCTS

  const productsResponse = await viewsController.getAllProductsControllerV();
  // const productList = productsResponse.result;
  // socket.emit('products', productList);
  socket.emit('products', productsResponse.result);

  socket.on('busquedaFiltrada', async (busquedaProducts) => {
    const {
      limit,
      page,
      sort,
      filtro,
      filtroVal
    } = busquedaProducts;
    const productsResponse = await viewsController.getAllProductsControllerV(limit, page, sort, filtro, filtroVal);
    // const productsFilter = productsResponse.result
    // socket.emit('products', productsFilter);
    socket.emit('products', productsResponse.result);
  });

  // MESSAGES: 

  const messages = await viewsController.getAllMessageControllerV();
  // const messageResult = messages.result;
  socket.emit("messages", messages.result);

  // // CARTS

  // socket.on('cartid', async (cartID) => {
  //   const cart = await viewsController.getCartByIdV(cartID);
  //   const cartResult = cart.result;
  //   socket.emit('cartuser', cartResult);
  // });
  
});

// MIDDLEWARE (all requests have access to socket server)
app.use((req, res, next) => {
  req.socketServer = socketServer;
  next();
})

// ROUTES
app.use("/", viewsRouter);
app.use("/api/chat", msmRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", userRouter);
app.use("/api/products", productsRouter);
app.use('/api/tickets', ticketRouter);
app.use('/mockProducts', mockRouter);