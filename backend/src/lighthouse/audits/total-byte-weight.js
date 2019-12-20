/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const OriginalTotalByteWeight = require('lighthouse/lighthouse-core/audits/byte-efficiency/total-byte-weight');
const ByteEfficiencyAudit = require('lighthouse/lighthouse-core/audits/byte-efficiency/byte-efficiency-audit');
const i18n = require('lighthouse/lighthouse-core/lib/i18n/i18n.js');

const UIStrings = {
  title: 'Avoids large network payloads',
  failureTitle: 'Avoid large network payloads',
  description:
  'Large network payloads are highly correlated with ' +
    'high energy usage, especially on mobile networks. Also, pages will load slower.',
};

const str_ = i18n.createMessageInstanceIdFn(__filename, UIStrings);

class TotalByteWeight extends OriginalTotalByteWeight {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({}, OriginalTotalByteWeight.meta, {
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
    });
  }

  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // see https://www.desmos.com/calculator/gpmjeykbwr
      // About 100 KB was the average page size in the beginning of the 21
      // century. Top notch!
      // The average page size nowadays is about 2.5 MB. That should give a bad
      // score. We can do much better!
      scorePODR: 100 * 1024,
      scoreMedian: 850 * 1024,
    };
  }
}

module.exports = TotalByteWeight;
module.exports.UIStrings = UIStrings;
