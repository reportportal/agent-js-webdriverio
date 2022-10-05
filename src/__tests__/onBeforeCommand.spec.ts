/*
 *  Copyright 2022 EPAM Systems
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
import { getClientConfig } from '../utils';
import { testId, testName } from './mocks/data';
import { options } from './mocks/optionsMock';
import { RPClientMock } from './mocks/RPClientMock';

describe('onBeforeCommand', () => {
  const reporter = new Reporter(options);
  reporter['client'] = new RPClientMock(getClientConfig(options));
  reporter['storage'].addTest({ id: testId, name: testName });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('reportSeleniumLogs command. client.send should be called with corresponding params if command.body is not empty', () => {
    reporter['options'].reportSeleniumCommands = true;
    reporter['options'].seleniumCommandsLogLevel = 'debug';

    const command = {
      method: 'POST',
      endpoint: '/session/:sessionId/url',
      body: { url: 'https://google.com' },
      result: { value: 'complete' },
      sessionId: 'd315f4dddf5199a74eac978476bad9d0',
      cid: '0-0',
    };

    reporter.onBeforeCommand(command);

    const method = `${command.method} ${command.endpoint}`;
    const data = JSON.stringify(command.body);
    const { seleniumCommandsLogLevel } = reporter['options'];

    expect(reporter['client'].sendLog).toBeCalledWith(
      testId,
      {
        level: seleniumCommandsLogLevel,
        message: `${method} ${data}`,
      },
      undefined,
    );
  });
  it('reportSeleniumLogs command. client.send should be called with corresponding params if command.body is empty', () => {
    reporter['options'].reportSeleniumCommands = true;
    reporter['options'].seleniumCommandsLogLevel = 'debug';

    const command = {
      method: 'POST',
      endpoint: '/session/:sessionId/url',
      body: {},
      result: { value: 'complete' },
      sessionId: 'd315f4dddf5199a74eac978476bad9d0',
      cid: '0-0',
    };

    reporter.onBeforeCommand(command);

    const method = `${command.method} ${command.endpoint}`;
    const { seleniumCommandsLogLevel } = reporter['options'];

    expect(reporter['client'].sendLog).toBeCalledWith(
      testId,
      {
        level: seleniumCommandsLogLevel,
        message: `${method}`,
      },
      undefined,
    );
  });

  it('reportSeleniumLogs command. client.send should not be called', () => {
    reporter['options'].reportSeleniumCommands = false;
    reporter['options'].seleniumCommandsLogLevel = 'debug';

    const command = {
      method: 'POST',
      endpoint: '/session/:sessionId/url',
      body: {},
      result: { value: 'complete' },
      sessionId: 'd315f4dddf5199a74eac978476bad9d0',
      cid: '0-0',
    };

    reporter.onBeforeCommand(command);

    expect(reporter['client'].sendLog).not.toBeCalled();
  });
});
