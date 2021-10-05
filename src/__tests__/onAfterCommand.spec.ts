/*
 *  Copyright 2021 EPAM Systems
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { Reporter } from '../reporter';
import { options } from './mocks/optionsMock';
import { RPClientMock } from './mocks/RPClientMock';
import { testId, testName } from './mocks/data';
import { getClientConfig } from '../utils';

describe('onAfterCommand', () => {
  const reporter = new Reporter(options);
  reporter['client'] = new RPClientMock(getClientConfig(options));
  reporter['storage'].addTest({ id: testId, name: testName });

  it('screenshot command. client.send should be called with corresponding params', () => {
    reporter['options'].attachPicturesToLogs = true;
    const command = {
      method: 'GET',
      endpoint: '/session/:sessionId/screenshot',
      body: {},
      result: {
        value: 'iVBORw0K',
      },
      sessionId: 'd315f4dddf5199a74eac978476bad9d0',
      cid: '0-0',
    };

    reporter.onAfterCommand(command);

    expect(reporter['client'].sendLog).toBeCalledWith(
      'test_id',
      { level: 'INFO', message: '' },
      { content: 'iVBORw0K', name: 'screenshot', type: 'image/png' },
    );
  });
});
