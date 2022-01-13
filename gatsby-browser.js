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

export const onClientEntry = () => {
  if(isBrowser){
    window.digitalData = window.digitalData || {};
    window.digitalData = {
      page : {
        pageInfo : {
          siteSection : '',
          template : '',
          language: 'en-us',
          geoRegion: '',
          issueDate: '',
          breadCrumbs: []
        }
      }
    }

    window.onload = () => {
      window.digitalData.page.pageInfo.breadCrumbs = [];
      document.querySelectorAll('.spectrum-Breadcrumbs-item').forEach((item) => {
        window.digitalData.page.pageInfo.breadCrumbs.push(item.innerText);
      });
    }
  }

}

export const onRouteUpdate = ({ location, prevLocation }) => {
  // TODO: move this into a plugin 
  if(isBrowser) {
    let siteSection = location.pathname.split('/');
    window.digitalData.page.pageInfo.siteSection = siteSection.pop() || siteSection.pop();

    window.digitalData.page.pageInfo.breadCrumbs = [];
    document.querySelectorAll('.spectrum-Breadcrumbs-item').forEach((item) => {
      window.digitalData.page.pageInfo.breadCrumbs.push(item.innerText);
    });

    let getCredentialsButton = Array.from(document.querySelectorAll('a')).find(el => el.textContent === 'Get credentials');
    // production
    if(window.location.host.indexOf('developer.adobe.com') >= 0) {
      getCredentialsButton.href = 'https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html';
      if(window.location.pathname.indexOf('pdf-services-api') >= 0) {
        getCredentialsButton.href = 'https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api';
      } else if(window.location.pathname.indexOf('document-generation-api') >= 0){
        getCredentialsButton.href = 'https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=document-generation-api';
      } else if(window.location.pathname.indexOf('pdf-extract-api') >= 0){
        getCredentialsButton.href = 'https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-extract-api';
      } else if(window.location.pathname.indexOf('pdf-embed-api') >= 0){
        getCredentialsButton.href = 'https://documentcloud.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api';
      }
      getCredentialsButton.setAttribute('daa-ll', getCredentialsButton.href);
    // stage
    } else {
      getCredentialsButton.href = 'https://dc.stage.acrobat.com/dc-integration-creation-app-cdn/main.html';

      if(window.location.pathname.indexOf('pdf-services-api') >= 0) {
        getCredentialsButton.href = 'https://dc.stage.acrobat.com/dc-integration-creation-app-cdn/main.html?api=pdf-services-api';
      } else if(window.location.pathname.indexOf('document-generation-api') >= 0){
        getCredentialsButton.href = ' https://dc.stage.acrobat.com/dc-integration-creation-app-cdn/main.html?api=document-generation-api';
      } else if(window.location.pathname.indexOf('pdf-extract-api') >= 0){
        getCredentialsButton.href = 'https://dc.stage.acrobat.com/dc-integration-creation-app-cdn/index.html?api=pdf-extract-api';
      } else if(window.location.pathname.indexOf('pdf-embed-api') >= 0){
        getCredentialsButton.href = 'https://dc.stage.acrobat.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api';
      }
      getCredentialsButton.setAttribute('daa-ll', getCredentialsButton.href);
    }
  }
}