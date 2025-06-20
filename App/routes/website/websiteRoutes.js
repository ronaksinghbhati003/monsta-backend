let express =require("express");
const { registerRoute } = require("./registerRotue");
const { loginRoute } = require("./loginRoutes");
const { contactRoute } = require("./companyContactRoute");
const { webProductRoute } = require("./websiteProductRoute");
const { cartRoute } = require("./addToCartRoute");
const { orderRoute } = require("./orderRoute");
const { billingRoute } = require("./billingRoute");
const { wishListRoute } = require("./wishListRoute");
let webSiteRoute=express.Router();

webSiteRoute.use('/user',registerRoute);
webSiteRoute.use('/login',loginRoute);
webSiteRoute.use('/company',contactRoute)
webSiteRoute.use('/home',webProductRoute);
webSiteRoute.use('/cart',cartRoute);
webSiteRoute.use('/order',orderRoute);
webSiteRoute.use('/billing',billingRoute);
webSiteRoute.use('/wishlist',wishListRoute);
module.exports={webSiteRoute};