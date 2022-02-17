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
    if (window.digitalData && window.digitalData.page) {
      window.digitalData.page.pageInfo.siteSection =
        siteSection.pop() || siteSection.pop();

      window.digitalData.page.pageInfo.breadCrumbs = [];
      document
        .querySelectorAll(".spectrum-Breadcrumbs-item")
        .forEach((item) => {
          window.digitalData.page.pageInfo.breadCrumbs.push(item.innerText);
        });
    }

    if (window._satellite && window.digitalData) {
      window._satellite.track("state", {
        digitalData: window.digitalData._snapshot(),
      });
    }

    let getCredentialsButton = Array.from(document.querySelectorAll("a")).find(
      (el) => el.textContent === "Get credentials"
    );

    let navLinksBaseUrl = "/document-services";
    let navLinksDocsBaseUrl = "";

    if (window.location.host.indexOf("adobe.com") >= 0) {
      navLinksDocsBaseUrl = "/document-services/docs";
    }

    // stage
    let baseurl =
      "https://dc.stage.acrobat.com/dc-integration-creation-app-cdn/main.html";

    // production
    if (
      window.location.host.indexOf("developer.adobe.com") >= 0 ||
      window.location.host.indexOf("adobe.io") >= 0
    ) {
      baseurl =
        "https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html";
    }

    getCredentialsButton.href = `${baseurl}`;

    let header = document.querySelector("header");
    header.setAttribute("daa-lh", "Gnav");
    header
      .querySelector("a[href='/']")
      ?.setAttribute("daa-ll", "Adobe Developer");
    header
      .querySelector("a[href='/apis/']")
      ?.setAttribute("daa-ll", "Products");
    header
      .querySelector(`a[href='${navLinksBaseUrl}/homepage/']`)
      ?.setAttribute("daa-ll", "Adobe Document Services");
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
        "a[href='https://developer.adobe.com/document-services/docs/overview/pdf-services-api/dcserviceslicensing?aio_internal']"
      )
      ?.setAttribute("daa-ll", "Licensing");
    header
      .querySelector(`a[href='${navLinksDocsBaseUrl}/overview/']`)
      ?.setAttribute("daa-ll", "Documenation Overview");
    header
      .querySelector(
        `a[href='${navLinksDocsBaseUrl}/overview/pdf-services-api/']`
      )
      ?.setAttribute("daa-ll", "Documenation PDF Services API");
    header
      .querySelector(
        `a[href='${navLinksDocsBaseUrl}/overview/pdf-extract-api/']`
      )
      ?.setAttribute("daa-ll", "Documenation PDF Extract API");
    header
      .querySelector(
        `a[href='${navLinksDocsBaseUrl}/overview/document-generation-api/']`
      )
      ?.setAttribute("daa-ll", "Documenation Document Generation API");
    header
      .querySelector(`a[href='${navLinksDocsBaseUrl}/overview/pdf-embed-api/']`)
      ?.setAttribute("daa-ll", "Documenation PDF Embed API");
    header
      .querySelector(`a[href='${baseurl}']`)
      ?.setAttribute("daa-ll", "Get credentials");
    header
      .querySelector("a[href='/console']")
      ?.setAttribute("daa-ll", "Console");

    let footer = document.querySelector("footer");
    footer?.setAttribute("daa-lh", "Footer");
    footer?.querySelectorAll("a").forEach((link) => {
      if (link.textContent) {
        link.setAttribute("daa-ll", link.textContent);
      }
    });

    if (window.location.pathname.indexOf("pdf-services-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=pdf-services-api`;
    } else if (
      window.location.pathname.indexOf("document-generation-api") >= 0
    ) {
      getCredentialsButton.href = `${baseurl}?api=document-generation-api`;
    } else if (window.location.pathname.indexOf("pdf-extract-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=pdf-extract-api`;
    } else if (window.location.pathname.indexOf("pdf-embed-api") >= 0) {
      getCredentialsButton.href = `${baseurl}?api=pdf-embed-api`;
    }
  }
};
