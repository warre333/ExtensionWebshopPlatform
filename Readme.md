# Introduction
This project is a try on making a modular system for a webshop. The idea is to have a system that can be easily extended with new modules and that can be easily configured to fit the needs of the webshop. You'll have the bare minimum functions for a webshop in the base platform, and the idea is that you install new extentions to add more functionality to the webshop. Other developers should be able to create new extensions for the webshop and share them with others.

# File directory
- /BasePlatform (The base platform for the webshop)
    - /baseplatform (The base platform in NextJS)
    - /SharedAPI (The shared API for the extensions)
- /Extensions (Example extensions for the webshop)
    - /[extension name]
- /Templates (Templates for the webshop, users can choose a template for their webshop)
- /ComponentLibrary (Dashboard components that is used in the base platform and extensions)
- /Documentation: here I will keep my though process and ideas for the project

# Base platform
The base platform is the core of the webshop. It contains the basic functions that a webshop needs. The base platform is built with a REST API, a dashboard and a webshop. The base platform is built with NextJS.

## API
The API is build in NextJS. This API will handle the business logic of the store dashboard and the webshop. The API will have the following endpoints:
- /api/auth (login, register, forgot password, reset password)
- /api/users (get user, update user, delete user)
- /api/customers (CRUD)
- /api/stores (CRUD)
- /api/products (CRUD)
- /api/orders (get orders, create order, update order)
- /api/extensions (get extensions, get extension, install extension, update extension, delete extension, create extension)

## Frontend
The frontend is build in NextJS. The frontend makes uses of subdomain wildcard where the webshop and dashboard will be shown for the store, for example: warre.localhost. The frontend will have the following pages:
- store.domain/ (The webshop)
- store.domain/admin (The dashboard for the store owner)
- store.domain/admin/extensions (The dashboard for the store owner to manage the extensions)
- store.domain/admin/customers
- store.domain/admin/products
- store.domain/admin/orders
- store.domain/admin/settings
- domain/auth/login - register - forgot-password - reset-password (The auth pages)
- domain/ (The homepage of the platform)

I will be using PostgreSQL for the database. The tables that will be in the database are defined in the ERD, which can be found [here](./Documentation/Blueprinting/ERD.png).

# Extensions
The extensions are the modules that can be installed in the webshop. The extensions can be created by other developers and shared with others. The extensions will be installed in the base platform and will be shown in the dashboard of the store owner. The extensions will can be build in any language and should be hosted independently.

Extensions can get access to the data of the store through a GraphQL API. To be able to access the data of the store, the extension needs to have the valid scopes. The scopes are defined in the extension and the store owner needs to approve the scopes when installing the extension.

## Example extensions
- Product reviews
- Product ratings
- Inventory management
- Shipping
- Payment
- ...

# Shared API
The shared API is an API that can be used by the extensions to perform actions for the store. This seperate API is made to allow extensions to charge for being used, and to seperate it from the basic functionalities of the stores. This API will be made in NestJS and will give access to a GraphQL API and REST API. The Shared API will provide the following functionalities:
- Billing
- Webhooks
- GraphQL API

## GraphQL API
The GraphQL API is build in Apollo Server. This GraphQL API will make it able for the extensions to get access to the data of stores. The data will be secured by scopes.

## REST API
For the REST API part of the shared API, I will be using NestJS. This API will handle the business logic around payments of stores for making use of the base platform and extensions. 

## Shared components
Extensions can make use of the shared components that are in the component library. The shared components are built in React and can be used by developers to create extensions. For more details, refer to the [Component library](#component-library) section.

# Templates
The templates are the themes that the store owner can choose for their webshop. The templates are build in  and can be created by other developers. The templates will be installed in the base platform and will be shown in the dashboard of the store owner.

Templates will have a certain syntax so they can be fully customized and make use of predefined properties. The created files must have the correct name to be able to be mapped to the right page on the webshop, for example: file Home will be mapped to the /home page. The templates will be hosted on the servers of the platform after approval of the template. Templates will be structured as follows:
- /templates/[template name]
    - /Home
    - /Order
    - /...

# Component library
The component library is a library of components that can be used in the base platform and extensions. The components are build in React and can be used by other developers. The base platform and extensions will make use of the component library to have a consistent look and feel. The component library will be installed in the base platform and will be shown in the dashboard of the store owner. The component library will be structured as follows:
- /ComponentLibrary
    - /Button
    - /Input
    - /...

# Documentation
In the documentation folder I will keep my thoughts and ideas for the project. I will keep a step-by-step plan, the ERD, some flows, ... in this folder.