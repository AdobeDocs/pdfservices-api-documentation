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

(() => {
  let prefixPath =
    window.location.host.indexOf("localhost") >= 0
      ? "overview/"
      : "document-services/docs/overview/";
  let redirectPath = "";

  // redirect paths must land on developer.adobe.com/document-services/docs/overview/
  // or on localhost/overview/
  if (
    (window.location.hash !== "" &&
      window.location.host.indexOf("localhost") < 0 &&
      window.location.pathname === "/document-services/docs/overview/") ||
    (window.location.hash !== "" &&
      window.location.host.indexOf("localhost") >= 0 &&
      window.location.pathname === "/overview/")
  ) {
    switch (window.location.hash) {
      case "#adobe-analytics":
        redirectPath = prefixPath + `pdf-embed-api/howtodata/${window.location.search}#adobe-analytics`;
        break;
      case "#pdf-extract-api-for-extracting-pdf-structure-and-information":
        redirectPath =
          prefixPath +
          `${window.location.search}#pdf-extract-api-for-extracting-pdf-structure-and-information`;
        break;
      case "#beta-feature-extract-text-and-tables-and-styling-info":
        redirectPath =
          prefixPath +
          `pdf-extract-api/howtos/extract-api/${window.location.search}#beta-feature-extract-text-and-tables-and-styling-info`;
        break;
      case "#export-pdf":
        redirectPath =
          prefixPath + `pdf-services-api/howtos/export-pdf/${window.location.search}#export-a-pdf`;
        break;
      case "#extract-pdf":
        redirectPath = prefixPath + `pdf-services-api/howtos/extract-pdf${window.location.search}`;
        break;
      case "#extract-text-and-tables":
        redirectPath =
          prefixPath +
          `pdf-services-api/howtos/extract-pdf/${window.location.search}#extract-text-and-tables`;
        break;
      case "#extract-text-and-tables-and-character-bounding-boxes-w-renditions":
        redirectPath =
          prefixPath +
          `pdf-services-api/howtos/extract-pdf/${window.location.search}#extract-text-and-tables-and-character-bounding-boxes-w-renditions`;
        break;
      case "#extract-text-and-tables-and-table-structure-as-csv-w-renditions":
        redirectPath =
          prefixPath +
          `pdf-services-api/howtos/extract-pdf/${window.location.search}#extract-text-and-tables-and-table-structure-as-csv-w-renditions`;
        break;
      case "#extract-text-and-tables-w-renditions":
        redirectPath =
          prefixPath +
          `pdf-services-api/howtos/extract-pdf/${window.location.search}#extract-text-and-tables-w-tables-renditions`;
        break;
      case "#extract-text-from-a-pdf":
        redirectPath =
          prefixPath +
          `pdf-services-api/howtos/extract-pdf/${window.location.search}#extract-text-from-a-pdf`;
        break;
      case "#ocr-pdf":
        redirectPath = prefixPath + `pdf-services-api/howtos/ocr-pdf`;
        break;
      case "#protect-pdf":
        redirectPath = prefixPath + `pdf-services-api/howtos/protect-pdf${window.location.search}`;
        break;
      case "#protect-pdfs-with-user-password":
        redirectPath =
          prefixPath +
          `pdf-services-api/howtos/protect-pdf/${window.location.search}#protect-pdfs-with-owner-password`;
        break;
      case "#split-pdf":
        redirectPath = prefixPath + `pdf-services-api/howtos/split-pdf${window.location.search}`;
        break;
      case "#java":
        redirectPath = prefixPath + `pdf-services-api/${window.location.search}#java`;
        break;
      case "#node-js":
        redirectPath = prefixPath + `pdf-services-api/${window.location.search}#nodejs`;
        break;
      case "#python":
        redirectPath = prefixPath + `pdf-services-api/${window.location.search}#python`;
        break;
      case "#sdk":
        redirectPath = prefixPath + `pdf-services-api/${window.location.search}#sdk`;
        break;
    }

    window.location.href =
      decodeURIComponent("http://" + window.location.host + "/" + redirectPath);
  }
})();
