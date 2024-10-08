"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/utils.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    __export2(utils_exports, {
      esbuildIgnorePathPrefixPlugin: () => esbuildIgnorePathPrefixPlugin,
      matchApiRoute: () => matchApiRoute2
    });
    module2.exports = __toCommonJS2(utils_exports);
    function esbuildIgnorePathPrefixPlugin() {
      return {
        name: "ignore-path-prefix",
        setup(build) {
          build.onResolve({ filter: /^@fs/ }, (args) => ({
            path: args.path.replace(/^@fs/, "")
          }));
        }
      };
    }
    function matchApiRoute2(apiRoutes2, path) {
      if (path.startsWith("/"))
        path = path.substring(1);
      if (path.startsWith("api/"))
        path = path.substring(4);
      const pathSegments = path.split("/").filter((p) => p !== "");
      if (pathSegments.length === 0 || pathSegments.length === 1 && pathSegments[0] === "api") {
        const route2 = apiRoutes2.find((r) => r.path === "/");
        if (route2)
          return { route: route2, params: {} };
        else
          return void 0;
      }
      const params = {};
      const route = apiRoutes2.find((route2) => {
        const routePathSegments = route2.path.split("/").filter((p) => p !== "");
        if (routePathSegments.length !== pathSegments.length)
          return false;
        for (let i = 0; i < routePathSegments.length; i++) {
          const routePathSegment = routePathSegments[i];
          if (routePathSegment.match(/^\[.*]$/)) {
            params[routePathSegment.substring(1, routePathSegment.length - 1)] = pathSegments[i];
            if (i == routePathSegments.length - 1)
              return true;
            continue;
          }
          if (routePathSegment !== pathSegments[i])
            return false;
          if (i == routePathSegments.length - 1)
            return true;
        }
      });
      if (route)
        return { route, params };
    }
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js
var require_request = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/request.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var request_exports = {};
    __export2(request_exports, {
      default: () => request_default,
      parseMultipart: () => parseMultipart,
      parseUrlEncoded: () => parseUrlEncoded
    });
    module2.exports = __toCommonJS2(request_exports);
    var import_utils = require_utils();
    var UmiApiRequest3 = class {
      constructor(req, apiRoutes2) {
        this._params = {};
        this._body = null;
        this._req = req;
        const m = (0, import_utils.matchApiRoute)(apiRoutes2, this.pathName || "");
        if (m)
          this._params = m.params;
      }
      get params() {
        return this._params;
      }
      get body() {
        return this._body;
      }
      get headers() {
        return this._req.headers;
      }
      get method() {
        return this._req.method;
      }
      get query() {
        var _a, _b;
        return ((_b = (_a = this._req.url) == null ? void 0 : _a.split("?")[1]) == null ? void 0 : _b.split("&").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          const k = acc[key];
          if (k) {
            if (k instanceof Array) {
              k.push(value);
            } else {
              acc[key] = [k, value];
            }
          } else {
            acc[key] = value;
          }
          return acc;
        }, {})) || {};
      }
      get cookies() {
        var _a;
        return (_a = this._req.headers.cookie) == null ? void 0 : _a.split(";").reduce((acc, cur) => {
          const [key, value] = cur.split("=");
          acc[key.trim()] = value;
          return acc;
        }, {});
      }
      get url() {
        return this._req.url;
      }
      get pathName() {
        var _a;
        return (_a = this._req.url) == null ? void 0 : _a.split("?")[0];
      }
      readBody() {
        if (this._req.headers["content-length"] === "0") {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          let body = [];
          this._req.on("data", (chunk) => {
            body.push(chunk);
          });
          this._req.on("end", () => {
            var _a, _b;
            const bodyBuffer = Buffer.concat(body);
            switch ((_a = this._req.headers["content-type"]) == null ? void 0 : _a.split(";")[0]) {
              case "application/json":
                try {
                  this._body = JSON.parse(bodyBuffer.toString());
                } catch (e) {
                  this._body = body;
                }
                break;
              case "multipart/form-data":
                const boundary = (_b = this.headers["content-type"]) == null ? void 0 : _b.split("boundary=")[1];
                if (!boundary) {
                  this._body = body;
                  break;
                }
                this._body = parseMultipart(bodyBuffer, boundary);
                break;
              case "application/x-www-form-urlencoded":
                this._body = parseUrlEncoded(bodyBuffer.toString());
                break;
              default:
                this._body = body;
                break;
            }
            resolve();
          });
          this._req.on("error", reject);
        });
      }
    };
    function parseMultipart(body, boundary) {
      const hexBoundary = Buffer.from(`--${boundary}`, "utf-8").toString("hex");
      return body.toString("hex").split(hexBoundary).reduce((acc, cur) => {
        var _a, _b;
        const [hexMeta, hexValue] = cur.split(Buffer.from("\r\n\r\n").toString("hex"));
        const meta = Buffer.from(hexMeta, "hex").toString("utf-8");
        const name = (_a = meta.split('name="')[1]) == null ? void 0 : _a.split('"')[0];
        if (!name)
          return acc;
        const fileName = (_b = meta.split('filename="')[1]) == null ? void 0 : _b.split('"')[0];
        if (fileName) {
          const fileBufferBeforeTrim = Buffer.from(hexValue, "hex");
          const fileBuffer = fileBufferBeforeTrim.slice(0, fileBufferBeforeTrim.byteLength - 2);
          const contentType = meta.split("Content-Type: ")[1];
          acc[name] = {
            fileName,
            data: fileBuffer,
            contentType
          };
          return acc;
        }
        const valueBufferBeforeTrim = Buffer.from(hexValue, "hex");
        const valueBuffer = valueBufferBeforeTrim.slice(0, valueBufferBeforeTrim.byteLength - 2);
        acc[name] = valueBuffer.toString("utf-8");
        return acc;
      }, {});
    }
    function parseUrlEncoded(body) {
      return body.split("&").reduce((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = decodeURIComponent(value);
        return acc;
      }, {});
    }
    var request_default = UmiApiRequest3;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js
var require_response = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/response.js"(exports, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var response_exports = {};
    __export2(response_exports, {
      default: () => response_default
    });
    module2.exports = __toCommonJS2(response_exports);
    var UmiApiResponse3 = class {
      constructor(res) {
        this._res = res;
      }
      status(statusCode) {
        this._res.statusCode = statusCode;
        return this;
      }
      header(key, value) {
        this._res.setHeader(key, value);
        return this;
      }
      setCookie(key, value) {
        this._res.setHeader("Set-Cookie", `${key}=${value}; path=/`);
        return this;
      }
      end(data) {
        this._res.end(data);
        return this;
      }
      text(data) {
        this._res.setHeader("Content-Type", "text/plain; charset=utf-8");
        this._res.end(data);
        return this;
      }
      html(data) {
        this._res.setHeader("Content-Type", "text/html; charset=utf-8");
        this._res.end(data);
        return this;
      }
      json(data) {
        this._res.setHeader("Content-Type", "application/json");
        this._res.end(JSON.stringify(data));
        return this;
      }
    };
    var response_default = UmiApiResponse3;
  }
});

// node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js
var require_apiRoute = __commonJS({
  "node_modules/.pnpm/@umijs+preset-umi@4.0.15_rjcvefrtafgq4fj2mrpusruwom/node_modules/@umijs/preset-umi/dist/features/apiRoute/index.js"(exports, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target, mod));
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var apiRoute_exports = {};
    __export2(apiRoute_exports, {
      UmiApiRequest: () => import_request.default,
      UmiApiResponse: () => import_response.default,
      matchApiRoute: () => import_utils.matchApiRoute
    });
    module2.exports = __toCommonJS2(apiRoute_exports);
    var import_request = __toESM2(require_request());
    var import_response = __toESM2(require_response());
    var import_utils = require_utils();
  }
});

// src/.umi-production/api/register.ts
var register_exports = {};
__export(register_exports, {
  default: () => register_default2
});
module.exports = __toCommonJS(register_exports);

// src/.umi-production/api/_middlewares.ts
var middlewares_default = async (req, res, next) => {
  next();
};

// src/api/register.ts
var import_client = require("@prisma/client");
var import_bcryptjs = __toESM(require("bcryptjs"));

// utils/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var secret = process.env.JWT_SECRET;
function signToken(id) {
  if (!secret)
    throw new Error("Environment variable JWT_SECRET is not defined!");
  return new Promise((resolve, reject) => {
    import_jsonwebtoken.default.sign({ id }, secret, {}, (err, token) => {
      if (err || !token)
        return reject(err);
      resolve(token);
    });
  });
}

// src/api/register.ts
var register_default = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const prisma = new import_client.PrismaClient();
        const user = await prisma.user.create({
          data: {
            email: req.body.email,
            passwordHash: import_bcryptjs.default.hashSync(req.body.password, 8),
            name: req.body.name,
            avatarUrl: req.body.avatarUrl
          }
        });
        res.status(201).setCookie("token", await signToken(user.id)).json({ ...user, passwordHash: void 0 });
        await prisma.$disconnect();
      } catch (err) {
        res.status(500).json({
          result: false,
          message: typeof err.code === "string" ? "https://www.prisma.io/docs/reference/api-reference/error-reference#" + err.code.toLowerCase() : err
        });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
};

// src/.umi-production/api/register.ts
var import_apiRoute = __toESM(require_apiRoute());
var apiRoutes = [{ "path": "posts/[postId]", "id": "posts/[postId]", "file": "posts/[postId].ts", "absPath": "/posts/[postId]", "__content": "import { PrismaClient } from '@prisma/client';\nimport type { UmiApiRequest, UmiApiResponse } from 'umi';\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  let prisma: PrismaClient;\n  switch (req.method) {\n    case 'GET':\n      prisma = new PrismaClient();\n      const post = await prisma.post.findUnique({\n        where: { id: +req.params.postId },\n        include: {\n          author: true,\n        },\n      });\n      if (post) {\n        res.status(200).json(post);\n      } else {\n        res.status(404).json({ error: 'Post not found.' });\n      }\n\n      await prisma.$disconnect();\n\n      break;\n    default:\n      res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "posts", "id": "posts/index", "file": "posts/index.ts", "absPath": "/posts", "__content": "import { PrismaClient } from '@prisma/client';\nimport type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport { verifyToken } from 'utils/jwt';\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  let prisma: PrismaClient;\n  switch (req.method) {\n    case 'GET':\n      prisma = new PrismaClient();\n      const allPosts = await prisma.post.findMany({\n        include: { author: true },\n      });\n      res.status(200).json(allPosts);\n      await prisma.$disconnect();\n      break;\n    case 'POST':\n      if (!req.cookies?.token) {\n        return res.status(401).json({\n          message: 'Unauthorized',\n        });\n      }\n      const authorId = (await verifyToken(req.cookies.token)).id;\n      prisma = new PrismaClient();\n      const newPost = await prisma.post.create({\n        data: {\n          title: req.body.title,\n          content: req.body.content,\n          createdAt: new Date(),\n          authorId,\n          tags: req.body.tags.join(','),\n          imageUrl: req.body.imageUrl,\n        },\n      });\n      res.status(200).json(newPost);\n      await prisma.$disconnect();\n      break;\n    default:\n      res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }, { "path": "register", "id": "register", "file": "register.ts", "absPath": "/register", "__content": "import { PrismaClient } from '@prisma/client';\nimport type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport bcrypt from 'bcryptjs';\nimport { signToken } from 'utils/jwt';\n\nexport default async (req: UmiApiRequest, res: UmiApiResponse) => {\n  switch (req.method) {\n    case 'POST':\n      try {\n        const prisma = new PrismaClient();\n\n        const user = await prisma.user.create({\n          data: {\n            email: req.body.email,\n\n            passwordHash: bcrypt.hashSync(req.body.password, 8),\n            name: req.body.name,\n            avatarUrl: req.body.avatarUrl,\n          },\n        });\n\n        res\n          .status(201)\n          .setCookie('token', await signToken(user.id))\n          .json({ ...user, passwordHash: undefined });\n\n        await prisma.$disconnect();\n      } catch (err: any) {\n        res.status(500).json({\n          result: false,\n          message:\n            typeof err.code === 'string'\n              ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' +\n                err.code.toLowerCase()\n              : err,\n        });\n      }\n      break;\n    default:\n      res.status(405).json({ error: 'Method not allowed' });\n  }\n};\n" }, { "path": "login", "id": "login", "file": "login.ts", "absPath": "/login", "__content": "import { PrismaClient } from '@prisma/client';\nimport type { UmiApiRequest, UmiApiResponse } from 'umi';\nimport bcrypt from 'bcryptjs';\nimport { signToken } from 'utils/jwt';\n\nexport default async function (req: UmiApiRequest, res: UmiApiResponse) {\n  switch (req.method) {\n    case 'POST':\n      try {\n        const prisma = new PrismaClient();\n        const user = await prisma.user.findUnique({\n          where: {\n            email: req.body.email,\n          },\n        });\n        if (\n          !user ||\n          !bcrypt.compareSync(req.body.password, user.passwordHash)\n        ) {\n          return res.status(401).json({\n            message: 'Invalid email or password',\n          });\n        }\n        res\n          .status(200)\n          .setCookie('token', await signToken(user.id))\n          .json({ ...user, passwordHash: undefined });\n        await prisma.$disconnect();\n      } catch (err: any) {\n        res.status(500).json(err);\n      }\n      break;\n    default:\n      res.status(405).json({ error: 'Method not allowed' });\n  }\n}\n" }];
var register_default2 = async (req, res) => {
  const umiReq = new import_apiRoute.UmiApiRequest(req, apiRoutes);
  await umiReq.readBody();
  const umiRes = new import_apiRoute.UmiApiResponse(res);
  await new Promise((resolve) => middlewares_default(umiReq, umiRes, resolve));
  await register_default(umiReq, umiRes);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
