/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const isBrowser = typeof window !== "undefined";

export const onRouteUpdate = ({ location, prevLocation }) => {
  // TODO: move this into a plugin
  if (isBrowser) {
    let siteSection = location.pathname.split("/");
    try {
      if (
        window.digitalData &&
        window.digitalData.page &&
        window.digitalData.page.pageInfo
      ) {
        window.digitalData.page.pageInfo.siteSection =
          siteSection.pop() || siteSection.pop();

        window.digitalData.page.pageInfo.breadCrumbs = [];
        document
          .querySelectorAll(".spectrum-Breadcrumbs-item")
          .forEach((item) => {
            window.digitalData.page.pageInfo.breadCrumbs.push(item.innerText);
          });
      }
    } catch (err) {
      console.error("Unable to set  site section", err);
    }

    try {
      if (window._satellite && window.digitalData) {
        window._satellite.track("state", {
          digitalData: window.digitalData._snapshot(),
        });
      }
    } catch (err) {
      console.error("Unable to set state", err);
    }

    let getCredentialsButton = Array.from(document.querySelectorAll("a")).find(
      el => el.textContent === "Get credentials"
    );

    let navLinksBaseUrl = "/document-services";
    let navLinksDocsBaseUrl = "";

    if (window.location.host.indexOf("adobe.com") >= 0) {
      navLinksDocsBaseUrl = "/document-services/docs";
    }

    // stage
    let baseurl = 'https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/main.html'

    // production
    if (
      window.location.host.indexOf("developer.adobe.com") >= 0 ||
      window.location.host.indexOf("adobe.io") >= 0
    ) {
      baseurl = 'https://acrobatservices.adobe.com/dc-integration-creation-app-cdn/main.html';
    }

    let header = document.querySelector("header");
    header.setAttribute("daa-lh", "Gnav");
    header
      .querySelector("a[href='/']")
      ?.setAttribute("daa-ll", "Adobe Developer");
    header
      .querySelector("a[href='/apis/']")
      ?.setAttribute("daa-ll", "Products");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/']`)
      ?.setAttribute("daa-ll", "Adobe Acrobat Services");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/apis/pdf-services/']`)
      ?.setAttribute("daa-ll", "PDF Services");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/apis/pdf-extract/']`)
      ?.setAttribute("daa-ll", "PDF Extract");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/apis/doc-generation/']`)
      ?.setAttribute("daa-ll", "Document Generation");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/apis/pdf-embed/']`)
      ?.setAttribute("daa-ll", "PDF Embed");
    header
      .querySelector(
        `a[href='${navLinksBaseUrl}/use-cases/agreements-and-contracts/sales-proposals-and-contracts/']`
      )
      ?.setAttribute("daa-ll", "Use Cases");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/pricing/#main']`)
      ?.setAttribute("daa-ll", "Pricing");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/resources/']`)
      ?.setAttribute("daa-ll", "Developer Resources");
    header
      .querySelector(
        "a[href='https://community.adobe.com/t5/document-services-apis/bd-p/Document-Cloud-SDK?page=1&sort=latest_replies&filter=all']"
      )
      ?.setAttribute("daa-ll", "Forum");
    header
      .querySelector(
        "a[href='https://developer.adobe.com/document-services/docs/overview/limits/']"
      )
      ?.setAttribute("daa-ll", "Licensing");
    header
      .querySelector(`a[href='${navLinksDocsBaseUrl}/overview/']`)
      ?.setAttribute("daa-ll", "Documentation Overview");
    header
      .querySelector(
        `a[href='${navLinksDocsBaseUrl}/overview/pdf-services-api/']`
      )
      ?.setAttribute("daa-ll", "Documentation PDF Services API");
    header
      .querySelector(
        `a[href='${navLinksDocsBaseUrl}/overview/pdf-extract-api/']`
      )
      ?.setAttribute("daa-ll", "Documentation PDF Extract API");
    header
      .querySelector(
        `a[href='${navLinksDocsBaseUrl}/overview/document-generation-api/']`
      )
      ?.setAttribute("daa-ll", "Documentation Document Generation API");
    header
        .querySelector(`a[href='${navLinksDocsBaseUrl}/overview/pdf-electronic-seal-api/']`)
        ?.setAttribute("daa-ll", "Documentation PDF Electronic Seal API");
    header
      .querySelector(`a[href='${navLinksDocsBaseUrl}/overview/pdf-embed-api/']`)
      ?.setAttribute("daa-ll", "Documentation PDF Embed API");
    header
      .querySelector(`a[href='${baseurl}']`)
      ?.setAttribute("daa-ll", "Get credentials");
    header
      .querySelector("a[href='/console']")
      ?.setAttribute("daa-ll", "Console");

    let footer = document.querySelector("footer");
    footer?.setAttribute("daa-lh", "Footer");
    footer?.querySelectorAll("a").forEach(link => {
      if (link.textContent) {
        link.setAttribute("daa-ll", link.textContent);
      }
    });

    getCredentialsButton.setAttribute("target", "_blank");

    if (window.location.pathname.indexOf("pdf-services-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=pdf-services-api`;
    } else if (window.location.pathname.indexOf("document-generation-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=document-generation-api`;
    } else if ( window.location.pathname.indexOf("pdf-electronic-seal-api") >= 0 ) {
      getCredentialsButton.href = `${baseurl}?api=pdf-electronic-seal-api`;
    } else if (window.location.pathname.indexOf("pdf-extract-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=pdf-extract-api`;
    } else if (window.location.pathname.indexOf("pdf-embed-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=pdf-embed-api`;
    } else if (window.location.pathname.indexOf("pdf-accessibility-auto-tag-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=pdf-accessibility-auto-tag-api`;
    } else {
      getCredentialsButton.href = baseurl;
    }

    var pageHeadTittle = null;
    if (window.location.pathname.indexOf("pdf-services-api/") >= 0) {
      pageHeadTittle = "PDF Services API Overview Quickstarts";
      if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/create-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Create PDF";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/export-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Export PDF";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/combine-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Combine PDF Files";
      } else if (
        window.location.pathname.indexOf("pdf-services-api/howtos/ocr-pdf/") >=
        0
      ) {
        pageHeadTittle = "PDF Services API OCR PDF";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/compress-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Compress PDFs";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/linearize-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Linearize PDFs";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/protect-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Protect PDF";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/remove-protection/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Remove Protection";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/insert-pages/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Insert Pages";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/replace-pages/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Replace Pages";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/delete-pages/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Delete Pages";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/reorder-pages/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Reorder Pages";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/rotate-pages/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Rotate Pages";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/split-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Split PDF";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/extract-pdf/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Extract PDF";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/howtos/pdf-properties/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Get PDF Properties";
      } else if (
        window.location.pathname.indexOf("pdf-services-api/policies/") >= 0
      ) {
        pageHeadTittle = "PDF Services API Version - Support policy";
      } else if (
        window.location.pathname.indexOf("pdf-services-api/releasenotes/") >= 0
      ) {
        pageHeadTittle = "PDF Services API Release Notes";
      } else if (
        window.location.pathname.indexOf(
          "pdf-services-api/dcserviceslicensing/"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Licensing";
      }else if (window.location.pathname.indexOf("pdf-services-api/howtos/") >= 0) {
        pageHeadTittle = "PDF Services API How Tos";
      }
    } else if (window.location.pathname.indexOf("policies/") >= 0) {
      pageHeadTittle = "Archives Version Support Policy";
    } else if (window.location.pathname.indexOf("pdf-embed-api/") >= 0) {
      pageHeadTittle = "PDF Embed API Overview Quick starts";
      if (window.location.pathname.indexOf("pdf-embed-api/howtos/") >= 0) {
        pageHeadTittle = "PDF Embed API basics";
      } else if (
        window.location.pathname.indexOf("pdf-embed-api/howtos_ui/") >= 0
      ) {
        pageHeadTittle = "PDF Embed API UI Customization";
      } else if (
        window.location.pathname.indexOf("pdf-embed-api/howtos_comments/") >= 0
      ) {
        pageHeadTittle = "PDF Embed API Comments and Markup";
      } else if (
        window.location.pathname.indexOf("pdf-embed-api/howtodata/") >= 0
      ) {
        pageHeadTittle = "PDF Embed API Analytics";
      } else if (
        window.location.pathname.indexOf("pdf-embed-api/searchengineindexing/") >= 0
      ) {
        pageHeadTittle = "PDF Embed API Handle search engine indexing";
      } else if (
        window.location.pathname.indexOf("pdf-embed-api/modernviewer/") >= 0
      ) {
        pageHeadTittle = "PDF Embed API Modern Viewer";
      } else if (
        window.location.pathname.indexOf("pdf-embed-api/releasenotes/") >= 0
      ) {
        pageHeadTittle = "PDF Embed API Release Notes";
      }
    } else if (window.location.pathname.indexOf("pdf-extract-api/") >= 0) {
      pageHeadTittle = "PDF Extract API Overview";
      if (
        window.location.pathname.indexOf("pdf-extract-api/quickstarts") >= 0
      ) {
        pageHeadTittle = "PDF Extract API Quickstarts";
      } else if (
        window.location.pathname.indexOf("pdf-extract-api/howtos/") >= 0
      ) {
        pageHeadTittle = "PDF Extract API How Tos Overview";
      } else if (
        window.location.pathname.indexOf(
          "pdf-extract-api/howtos/extract-api"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Extract API How Tos Extract PDF";
      } else if (
        window.location.pathname.indexOf("pdf-extract-api/releasenotes") >= 0
      ) {
        pageHeadTittle = "PDF Extract API Release Notes";
      } else if (
        window.location.pathname.indexOf(
          "pdf-extract-api/dcserviceslicensing"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Licensing";
      }
    } else if (
      window.location.pathname.indexOf("document-generation-api/") >= 0
    ) {
      pageHeadTittle = "Document Generation API Overview";
      if (
        window.location.pathname.indexOf(
          "document-generation-api/quickstarts"
        ) >= 0
      ) {
        pageHeadTittle = "Document Generation API Limitations Quickstarts";
      } else if (
        window.location.pathname.indexOf(
          "document-generation-api/templatetags"
        ) >= 0
      ) {
        pageHeadTittle = "Document Generation API Template Tags";
      } else if (
        window.location.pathname.indexOf("document-generation-api/fragments") >=
        0
      ) {
        pageHeadTittle = "Document Generation API Fragments";
      } else if (
        window.location.pathname.indexOf(
          "document-generation-api/stylingformattingtags"
        ) >= 0
      ) {
        pageHeadTittle = "Document Generation API Apply styling and formatting";
      } else if (
        window.location.pathname.indexOf("document-generation-api/hyperlink") >=
        0
      ) {
        pageHeadTittle = "Document Generation API Hyperlink";
      } else if (
        window.location.pathname.indexOf(
          "document-generation-api/complextableconstructs"
        ) >= 0
      ) {
        pageHeadTittle = "Document Generation API Dynamic Table Constructs";
      } else if (
        window.location.pathname.indexOf("document-generation-api/wordaddin") >=
        0
      ) {
        pageHeadTittle = "Document Generation API Word Add-in";
      } else if (
        window.location.pathname.indexOf(
          "document-generation-api/releasenotes"
        ) >= 0
      ) {
        pageHeadTittle = "Document Generation API Release Notes";
      } else if (
        window.location.pathname.indexOf(
          "document-generation-api/dcserviceslicensing"
        ) >= 0
      ) {
        pageHeadTittle = "PDF Services API Licensing";
      }
    } else if(
        window.location.pathname.indexOf("pdf-electronic-seal-api/") >= 0
    ){
      pageHeadTittle = "PDF Electronic Seal API Overview";
      if (
          window.location.pathname.indexOf("pdf-electronic-seal-api/quickstarts") >= 0
      ) {
        pageHeadTittle = "PDF Electronic Seal API Quickstarts";
      } else if (
          window.location.pathname.indexOf("pdf-electronic-seal-api/prerequisites") >= 0
      ) {
        pageHeadTittle = "PDF Electronic Seal API Prerequisites";
      }
    } else if (
        window.location.pathname.indexOf("overview/") >= 0
    ) {
        pageHeadTittle = "Overview Introduction";
    }
    if (pageHeadTittle != null) {
      document
        .querySelector("footer")
        .closest("main")
        .setAttribute("daa-lh", "Body");

      document
        .querySelector("footer")
        .closest("main")
        .querySelector("div")
        .setAttribute("daa-lh", `${pageHeadTittle}`);

      document.querySelectorAll(".spectrum-Link").forEach(link => {
        link.setAttribute("daa-ll", link.textContent);
      });
    }
  }
};
