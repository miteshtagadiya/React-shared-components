# React shared components

- By reusing your own components you can save development time, keep your UI consistent across applications and let your whole team build together.
- No need to create a UI library for reusable components across apps.
- Create Shared UI App to create UI components. Deploy Shared UI App and Dynamically load a React Component from that URL using [remote-component](https://github.com/Paciolan/remote-component).
- You can also add shared styles and common files in Shared App which you want to reuse.
***
## How Remote Components works
- The RemoteComponent React Component takes a URL as a prop. The URL is loaded and processed. This file must be a valid CommonJS Module that exports the component as default.
- While the URL is loading, the fallback will be rendered. This is a similar pattern to React.Suspense. If no fallback is provided, then nothing will be rendered while loading.
- Once loaded, there will either be an error a Component. The rendering will first be handled by the render callback function. If there is no render callback and err exists, a generic message will be shown.
- The Component will be rendered either to the render callback if one exists, otherwise, it will be rendered as a standard component.
***
## How Shared react components works
- To use UI Components in all the apps you have to follow this for all the apps.
- Install [remote-component](https://github.com/Paciolan/remote-component)
```sh
$ npm install @paciolan/remote-component --save
```
- Remote Components will require some dependencies to be injected into them. At the minimum, we'll be injecting the React dependency.
- The web application can include dependencies and inject them into the RemoteComponent. At a minimum, you will probably need the react dependency.
- Create a file **remote-component.config.js** in the root of the web application.
- If you are using any library or package that the Ui component is using then you have to add that dependency in this file.
- ex: If you are using Material-UI to create a UI component then you have to add material-ui as a dependency in this file like this:   
```["@material-ui/core"]: require("@material-ui/core")```
```sh
/**
 * remote-component.config.js
 * Dependencies for Remote Components
 */
module.exports = {
  resolve: {
    react: require("react")
  }
};
```
- Create a file named **RemoteComponent.js** in the src folder.
- Export RemoteComponent with the requires from remote-component.config.js. This will inject the dependencies into the RemoteComponent.
```sh
/*
 * src/components/RemoteComponent.js
 */
import {
  createRemoteComponent,
  createRequires
} from "@paciolan/remote-component";
import { resolve } from "../remote-component.config.js";

const requires = createRequires(resolve);
export const RemoteComponent = createRemoteComponent({ requires });
```
- Usage:
- Create a file that exports al UI components.
 ```
 import { RemoteComponent } from "./RemoteComponent";

const element = document.getElementById("app");
const url = "https://raw.githubusercontent.com/Paciolan/remote-component/master/examples/remote-components/HelloWorld.js";
const HelloWorld = props =>
  <RemoteComponent
    url={url}
    render={({ err, Component }) =>
      err ? <div>{err.toString()}</div> : <Component {...props} />
    }
  />
);
export default HelloWorld;
 ```
 - Now you can import HelloWorld component in your app like this:
 ```import { HelloWorld } from "./index";```
 - To use UI components in all the apps you have to add this configuration in all the apps.
 
***
## How to create Shared UI App
- To Create a Shared UI app follow this configuration.
- Create a Folder named Shared.
- Create a folder named src/UI(Or name you want).
- Create Components in the UI folder.
- Ex: To create a Label component in src folder create a file Label.js
```
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
```
- UI Component Label is created.
- Create package.json at the root of the app.
- Add all dependencies in the package.json which is required to create UI component. 
- Ex: Title Component is required material-ui, So Install material-ui first.
- If you want common CSS across all the apps or any common file that is used by all the apps then you can add it in the src folder.
- This file must be a valid CommonJS Module that exports the component as default, So we have to convert es6 files to commonjs.
- Create .babelrc in the root folder.
```
{
    "presets": [
        "minify",
        "@babel/preset-react",
        "@babel/env"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread"
    ]
}
```
- Install  "@babel/preset-react", "@babel/env", "@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-object-rest-spread".
- Add scripts in package.json to convert es6 files to commonJs module using babel.
```
"scripts": {
"build": "babel ./src --out-dir build --extensions '.ts,.tsx,.js,.jsx' && cp ./src/index.css build/",
"start": "serve --port 5000 --cors build"
},
```
- When you run npm run build, It will convert all files from src directory and add it in build directory and copy index.css file in the build folder.
- Now to use shared components and styles you have to serve build folder.
- You can get components js file from http://localhost:5001/UI/Label.js
***
## Example of this repo
- There are 2 apps created in this repo app1 and app2 which are using the shared app for reusable components.
- Created Remore-Component.jsx and remote-component-config.js files and are the same for both apps.
```
/**
 * remote-component.config.js
 *
 * Dependencies for Remote Components
 */

module.exports = {
  resolve: {
    react: require("react"),
    ["@material-ui/core"]: require("@material-ui/core"),
    ["@material-ui/icons"]: require("@material-ui/icons"),
    ["@material-ui/core/Link"]: require("@material-ui/core/Link"),
    ["@material-ui/core/styles"]: require("@material-ui/core/styles"),
    ["@material-ui/core/Typography"]: require("@material-ui/core/Typography"),
    ["recharts"]: require("recharts")
  }
};

```
```
import { createRemoteComponent } from "@paciolan/remote-component/dist/lib/createRemoteComponent";
import { createRequires } from "@paciolan/remote-component/dist/lib/createRequires";
import { resolve } from "./remote-component.config.js";

const requires = createRequires(resolve);
export const RemoteComponent = createRemoteComponent({ requires });

```
- Created **indexShared.js** file for add all UI components.
```
import React from "react";
import { RemoteComponent } from "./RemoteComponent";

const Title = (props) => {
  const url1 = "http://localhost:5000/ui/Title.js";
  return (
    <RemoteComponent
      url={url1}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { Title };

const Deposits = (props) => {
  const url = "http://localhost:5000/ui/Deposits.js";
  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { Deposits };

const Chart = (props) => {
  const url = "http://localhost:5000/ui/Chart.js";
  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { Chart };

const Orders = (props) => {
  const url = "http://localhost:5000/ui/Orders.js";
  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { Orders };

const listItems = (props) => {
  const url = "http://localhost:5000/ui/listItems.js";
  return (
    <RemoteComponent
      url={url}
      render={({ err, Component }) =>
        err ? <div>{err.toString()}</div> : <Component {...props} />
      }
    />
  );
};
export { listItems };
```
- imported all UI components in Dashboard.js file
```
import { Title, Deposits, Chart, Orders } from "./indexShared";
```
- Created a Shared folder for reusable components.
- Created the Common/ui folder and added all reusable components in ui folder.
- Created index.css file in the Common folder to reuse the same style in all the apps.
#### Start the Project
- Clone the repo
- Open each app and run **npm install**.
- Open Shared app and run **npm run build**
- Run all the apps by **npm start**
```
app1: http://localhost:3001
app2: http://localhost:3002
shared: http://localhost:5000
```
- UI components Chart, Deposits, Orders, and Title are shared with both the apps.