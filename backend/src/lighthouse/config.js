/**
 * @license Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

/* eslint-disable max-len */

const constants = require('lighthouse/lighthouse-core/config/constants.js');
const i18n = require('lighthouse/lighthouse-core/lib/i18n/i18n.js');

const UIStrings = {
  /** Title of the Performance category of audits. Equivalent to 'Web performance', this term is inclusive of all web page speed and loading optimization topics. Also used as a label of a score gauge; try to limit to 20 characters. */
  sustainabilityCategoryTitle: 'Environmental Sustainability',
  /** Title of the speed metrics section of the Performance category. Within this section are various speed metrics which quantify the pageload performance into values presented in seconds and milliseconds. */
  metricGroupTitle: 'Metrics',
  /** Title of the opportunity section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the loading performance of their web page. 'Suggestion'/'Optimization'/'Recommendation' are reasonable synonyms for 'opportunity' in this case. */
  loadOpportunitiesGroupTitle: 'Opportunities',
  /** Description of the opportunity section of the Performance category. 'Suggestions' could also be 'recommendations'. Within this section are audits with imperative titles that suggest actions the user can take to improve the loading performance of their web page. */
  loadOpportunitiesGroupDescription: 'These suggestions can help your page load faster. They don\'t directly affect the score.',
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupTitle: 'First Paint Improvements',
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the time of the first initial render of the webpage. */
  firstPaintImprovementsGroupDescription: 'The most critical aspect of performance is how quickly pixels are rendered onscreen. Key metrics: First Contentful Paint, First Meaningful Paint',
  /** Title of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupTitle: 'Overall Improvements',
  /** Description of an opportunity sub-section of the Performance category. Within this section are audits with imperative titles that suggest actions the user can take to improve the overall loading performance of their web page. */
  overallImprovementsGroupDescription: 'Enhance the overall loading experience, so the page is responsive and ready to use as soon as possible. Key metrics: Time to Interactive, Speed Index',
  /** Title of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on the page's page load performance characteristics. Whereas the 'Opportunities' suggest an action along with expected time savings, diagnostics do not. Within this section, the user may read the details and deduce additional actions they could take. */
  diagnosticsGroupTitle: 'Diagnostics',
  /** Description of the diagnostics section of the Performance category. Within this section are audits with non-imperative titles that provide more detail on a web page's load performance characteristics. Within this section, the user may read the details and deduce additional actions they could take to improve performance. */
  diagnosticsGroupDescription: 'More information about the performance of your application. These numbers don\'t [directly affect](https://github.com/GoogleChrome/lighthouse/blob/d2ec9ffbb21de9ad1a0f86ed24575eda32c796f0/docs/scoring.md#how-are-the-scores-weighted) the Performance score.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

/** @type {LH.Config.Json} */
const defaultConfig = {
  settings: constants.defaultSettings,
  passes: [{
    passName: 'defaultPass',
    recordTrace: true,
    useThrottling: true,
    pauseAfterLoadMs: 1000,
    networkQuietThresholdMs: 1000,
    cpuQuietThresholdMs: 1000,
    gatherers: [
      'css-usage',
      'viewport-dimensions',
      'runtime-exceptions',
      'console-messages',
      'anchor-elements',
      'image-elements',
      'link-elements',
      'meta-elements',
      'script-elements',
      'dobetterweb/domstats',
      'dobetterweb/optimized-images',
      'dobetterweb/response-compression',
    ],
  },
  {
    passName: 'offlinePass',
    gatherers: [
      'offline',
      'start-url',
    ],
  },
  {
    passName: 'redirectPass',
    // Speed up the redirect pass by blocking stylesheets, fonts, and images
    blockedUrlPatterns: ['*.css', '*.jpg', '*.jpeg', '*.png', '*.gif', '*.svg', '*.ttf', '*.woff', '*.woff2'],
    gatherers: [
      'http-redirect',
    ],
  }],
  audits: [
    'screenshot-thumbnails',
    'critical-request-chains',
    'mainthread-work-breakdown',
    'bootup-time',
    'resource-summary',
    'third-party-summary',
    'byte-efficiency/uses-long-cache-ttl',
    // 'byte-efficiency/total-byte-weight',
    'byte-efficiency/offscreen-images',
    'byte-efficiency/unminified-css',
    'byte-efficiency/unminified-javascript',
    'byte-efficiency/unused-css-rules',
    'byte-efficiency/uses-webp-images',
    'byte-efficiency/uses-optimized-images',
    'byte-efficiency/uses-text-compression',
    'byte-efficiency/uses-responsive-images',
    'byte-efficiency/efficient-animated-content',
    'dobetterweb/dom-size',
    'dobetterweb/js-libraries',
    'dobetterweb/uses-http2',
    'dobetterweb/uses-passive-event-listeners',
    'src/lighthouse/audits/total-byte-weight',
  ],

  groups: {
    'metrics': {
      title: str_(UIStrings.metricGroupTitle),
    },
    'load-opportunities': {
      title: str_(UIStrings.loadOpportunitiesGroupTitle),
      description: str_(UIStrings.loadOpportunitiesGroupDescription),
    },
    'diagnostics': {
      title: str_(UIStrings.diagnosticsGroupTitle),
      description: str_(UIStrings.diagnosticsGroupDescription),
    },
  },
  categories: {
    'sustainability': {
      title: str_(UIStrings.sustainabilityCategoryTitle),
      auditRefs: [
        {id: 'total-byte-weight', weight: 5, group: 'metrics'},
        {id: 'mainthread-work-breakdown', weight: 1, group: 'metrics'},
        {id: 'uses-responsive-images', weight: 0, group: 'load-opportunities'},
        {id: 'offscreen-images', weight: 0, group: 'load-opportunities'},
        {id: 'unminified-css', weight: 0, group: 'load-opportunities'},
        {id: 'unminified-javascript', weight: 0, group: 'load-opportunities'},
        {id: 'unused-css-rules', weight: 0, group: 'load-opportunities'},
        {id: 'uses-optimized-images', weight: 0, group: 'load-opportunities'},
        {id: 'uses-webp-images', weight: 0, group: 'load-opportunities'},
        {id: 'uses-text-compression', weight: 0, group: 'load-opportunities'},
        {id: 'efficient-animated-content', weight: 0, group: 'load-opportunities'},
        {id: 'uses-long-cache-ttl', weight: 0, group: 'diagnostics'},
        {id: 'dom-size', weight: 0, group: 'diagnostics'},
        {id: 'critical-request-chains', weight: 0, group: 'diagnostics'},
        {id: 'bootup-time', weight: 0, group: 'diagnostics'},
        {id: 'resource-summary', weight: 0, group: 'diagnostics'},
        {id: 'third-party-summary', weight: 0, group: 'diagnostics'},
        {id: 'uses-http2', weight: 1, group: 'diagnostics'},
        {id: 'uses-passive-event-listeners', weight: 1, group: 'diagnostics'},
        {id: 'js-libraries', weight: 0, group: 'diagnostics'},
        {id: 'screenshot-thumbnails', weight: 0, group: 'diagnostics'},
      ],
    },
  },
};

module.exports = defaultConfig;

// Use `defineProperty` so that the strings are accesible from original but ignored when we copy it
Object.defineProperty(module.exports, 'UIStrings', {
  enumerable: false,
  get: () => UIStrings,
});
