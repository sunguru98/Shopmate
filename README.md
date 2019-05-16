# Turing Shopmate Front end challenge

## By Sundeep Charan Ramkumar

### [Shopmate - Website](https://shopmateapp.netlify.com)

---

## Table of contents

  1. [Project commands](#project-commands)
  2. [Technologies Used](#technologies-used)
  3. [File Structure](#file-structure)
  4. [API Endpoints Used](#api-endpoints-used)

---

## Install Instructions

### Installs code base

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

---

## Technologies Used

* Design of the application
  * __HTML__
  * __CSS__ (with __SCSS__ preprocessor)

* Functionalities of the application
  * __Vue.js__ (SPA Framework)
  * __Vuex__ (for state management)
  * __axios__ (for API calls )
* Bundling of the application
  * __Vue CLI__ (uses webpack)
* Deployment of the application
  * __Vue CLI__ (for build mode)
  * __Netlify__ (for hosting)

---

## File Structure

* __src__ (Root directory)
  * __assets__ (All static files)
    * __img__ (Images of the app)
    * __sass__ (The design files)
      * __allproducts__ (Home page)
      * __checkout__ (Checkout for all 4 phases)
      * __common__ (Common Design rules)
      * __pages__ (All pages)
      * __productDetail__ (Detail view page)
      * __shoppingCart__ (Popover cart)
  * __components__ (Vue components)
    * __auth__ (Auth page's components)
    * __common__ (Common components)
    * __header__ (Navbar component)
    * __home__ (Home page component)
    * __profile__ (Profile page component)
  * __mixins__ (Common data and computed properties)
  * __pages__ (All vue-routes and page logic)
  * __store__ (Vuex store root folder)
    * __modules__ (Modules for each function)
    * index.js (Central store file)
  * __App.vue__ (Central file for all components)
  * main.js (Vue and Vuex imported here)
  * router.js (All routes registered)

---

## API Endpoints Used

* __GET__
  * __/ departments__
  * __/ categories__
  * __/ attributes / inProduct / {product_id}__
  * __/ products__
  * __/ products / inCategory / {category_id}__
  * __/ products / inDepartment / {department_id}__
  * __/ products / {product_id} / reviews__
  * __/ customer__ (with header accessToken)
  * __/ shoppingcart / generateUniqueId__
  * __/ shoppingcart / {cart_id}__
  * __/ shoppingcart / totalAmount / {cart_id}__
  * __/ shipping / regions__
  * __/ shipping / regions / {shipping_region_id}__
* __POST__
  * __/ products / {product_id} / reviews__ (with header accessToken)
  * __/ customers__ (with header accessToken)
  * __/ customers / login__ (with header accessToken)
  * __/customers / facebook__ (with header accessToken)
  * __/ shoppingcart / add__
  * __/ stripe / charge__
* __PUT__
  * __/ customer__
  * __/ customer / address__
  * __/ shoppingcart / update / {item_id}__
* __DELETE__
  * __/ shoppingcart / removeProduct / {item_id}__
  * __/ shoppingcart / empty / {cart_id}__
