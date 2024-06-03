"use strict";
(() => {
var exports = {};
exports.id = 214;
exports.ids = [214];
exports.modules = {

/***/ 954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _postpath_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
;// CONCATENATED MODULE: external "graphql-request"
const external_graphql_request_namespaceObject = require("graphql-request");
;// CONCATENATED MODULE: ./pages/[...postpath].tsx




const getServerSideProps = async (ctx)=>{
    const endpoint = process.env.GRAPHQL_ENDPOINT;
    const graphQLClient = new external_graphql_request_namespaceObject.GraphQLClient(endpoint);
    const referringURL = ctx.req.headers?.referer || null;
    const pathArr = ctx.query.postpath;
    const path = pathArr.join("/");
    console.log("path::", path);
    const fbclid = ctx.query.fbclid;
    // redirect if facebook is the referer or request contains fbclid
    if (referringURL?.includes("facebook.com") || fbclid) {
        return {
            redirect: {
                permanent: false,
                destination: `${endpoint.replace(/(\/graphql\/)/, "/") + encodeURI(path)}`
            }
        };
    }
    const query = external_graphql_request_namespaceObject.gql`
		{
			post(id: "/${path}/", idType: URI) {
				id
				excerpt
				title
				link
				dateGmt
				modifiedGmt
				content
				author {
					node {
						name
					}
				}
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
		}
	`;
    const data = await graphQLClient.request(query);
    if (!data.post) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            path,
            post: data.post,
            host: ctx.req.headers.host
        }
    };
};
const Post = (props)=>{
    const { post , host , path  } = props;
    // to remove tags from excerpt
    const removeTags = (str)=>{
        if (str === null || str === "") return "";
        else str = str.toString();
        return str.replace(/(<([^>]+)>)/gi, "").replace(/\[[^\]]*\]/, "");
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:title",
                        content: post.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "canonical",
                        href: `https://${host}/${path}`
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:description",
                        content: removeTags(post.excerpt)
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:url",
                        content: `https://${host}/${path}`
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:type",
                        content: "article"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:locale",
                        content: "en_US"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:site_name",
                        content: host.split(".")[0]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "article:published_time",
                        content: post.dateGmt
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "article:modified_time",
                        content: post.modifiedGmt
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:image",
                        content: post.featuredImage.node.sourceUrl
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                        property: "og:image:alt",
                        content: post.featuredImage.node.altText || post.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: post.title
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "post-container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        children: post.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: post.featuredImage.node.sourceUrl,
                        alt: post.featuredImage.node.altText || post.title
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("article", {
                        dangerouslySetInnerHTML: {
                            __html: post.content
                        }
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const _postpath_ = (Post);


/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(954));
module.exports = __webpack_exports__;

})();