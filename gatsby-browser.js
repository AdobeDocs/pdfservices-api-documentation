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

import React from 'react';

export const onClientEntry = () => {
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
    document.querySelectorAll('.spectrum-Breadcrumbs-item').forEach((item) => {
      digitalData.page.pageInfo.breadCrumbs.push(item.innerText);
    });
  
    if(typeof _satellite !== 'undefined') {
      _satellite.track('state', {
        digitalData: digitalData
      });
    }

    
  }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
  let siteSection = location.pathname.split('/');
  digitalData.page.pageInfo.siteSection = siteSection.pop() || siteSection.pop();
  _satellite.track('state', {
    digitalData: digitalData
  });
}