# Webpack with ASP.NET Core

This repo is a POC which uses ASP.NET Core Razor pages with Webpack, TypeScript, SASS and Knockout.js with runtime compilation.

Webpack is configured to create two bundles in the `wwwroot/dist` folder, one for JavaScript and the other for CSS, these are then included in `_Layout.cshtml`. 

Each page consists of 4 files: `Page.cshtml`, `Page.cshtml.cs`, `Page.script.ts` and `Page.style.scss`.

`compile.json` tells Webpack how to handle the compilation. It has 3 settings:
* `Entry`: This field contains files or filters for compilation endpoints. These are `*.script.ts` and `*.style.scss` files, this way each page has its own script and stylesheet.
* `Lib`: This field maps module names to implementation files, these are also included in the bundle.
* `External`: this field maps module names to their global imports. This can be used to import modules which are not handled by Webpack (they are not included in the bundle). For example `jquery` is loaded in the `<head>` tag, then a `"jquery": "jQuery"` mapping makes it possible to import it as `import * as $ from "jquery";`.

In `Debug` configuration `npm run watch` is automatically run with the webserver, this is done using an `NpmScriptRunner` service, which is based on the code for `UseReactDevelopmentServer` from `Microsoft.AspNetCore.SpaServices.Extensions`. This makes it possible to modify TypeScript and SCSS then wait for the compilation (takes 2-3sec, output is also logged using an `ILogger`) and reload the page in the browser (Note: cache needs to be disabled).

The example page is a TypeScript version of Knockout example [Working with Lists and Collections](http://learn.knockoutjs.com/#/?tutorial=collections).

## Setup

1. Run `npm i` to install all dependencies and types.
2. (Optional) Run `npm run build` to make the first version of the bundles.
3. Open the project and run.

Note: The first Webpack compilation might be slow, so keep an eye on the log output and once it finishes reload the page (otherwise the bundles will be missing and the page won't work).

## Other

To make the project more organised in the Solution Explorer, it is possible to create custom file nesting settings, this makes it possible to nest the `*.script.ts` and `*.style.scss` files under their `*.cshtml` files, just like `*.cshtml.cs`. A configuration for this can be found in `filenesting_custom.json`, which can be added using the `File nesting` menu in the Solution Explorer.