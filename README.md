<br/>
<p align="center">
  <a href="https://github.com/ShaanCoding/Monday">
    <img src="https://vitejs.dev/logo-with-shadow.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Monday Board Snapshot</h3>

  <p align="center">
    Snapshot your Monday boards any time!
    <br/>
    <br/>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/ShaanCoding/Monday/total) ![Contributors](https://img.shields.io/github/contributors/ShaanCoding/Monday?color=dark-green) ![Issues](https://img.shields.io/github/issues/ShaanCoding/Monday) ![License](https://img.shields.io/github/license/ShaanCoding/Monday) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

This project is a simple full-stack application, whose purpose is to snapshot board states from monday.com API. The project assumes a company role approach where each deployment of this application is for one company with employees registering to the application and taking snapshots of board states 


## Built With

This project is divided into 2 parts, server, and client.

**Server**
The server was built primarily with :
* Node Js [Nest js] - As per instructions
* Mongo DB [Mongoose Orm] - As per instructions
* Axios - for making requests to the Monday.com server

**Client**
The client was constructed with 
* React Js - As per instructions
* Bootstrap 5 - As per instructions
* Vite - For fast setup and faster build time
* Axios - for making requests to the backend
* Formik - for easy form validation
* Yup - to generate schema for validation






## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

The first tool that needs to be installed is

* npm

and can be done using the following : 
```sh
npm install npm@latest -g
```

### Installation

1. Get a free API Key at [https://www.monday.com)

2. Clone the repo

```sh
git clone https://github.com/natghi2010/Monday
```

3. Change the directory to the 'server' folder and run:

```sh
npm install
```
5. Rename env.dev file to .env

6. Enter your configuration details inside the .env file.
7. To run the server side development server enter:
 ```sh
npm start
```


9. To install the client side requirments, change the directory to the 'client' folder and run:

```sh
npm install
```

10. Inside the client folder, navigate to the src/config/config.js file and change the server to your address. e.g 'http://localhost:4000'
The configuration should look like this:

```JS
export const BASE_URL = '';
```
11. Finally to run the client side development server
```sh
npm run dev
```

## Usage






## Authors

* **Natnael Ghirma** - *Software Engineer* - [Natnael Ghirma](natnaelghirma.com) - **

