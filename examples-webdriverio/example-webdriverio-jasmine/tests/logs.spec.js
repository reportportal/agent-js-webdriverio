const fs = require('fs');
const path = require('path');
const { ReportingApi } = require('@reportportal/agent-js-webdriverio/src/reportingApi');

const attachments = [
  {
    filename: 'test.jpg',
    type: 'image/jpg',
  },
  {
    filename: 'test.png',
    type: 'image/png',
  },
  {
    filename: 'test.html',
    type: 'application/html',
  },
  {
    filename: 'test.json',
    type: 'application/json',
  },
  {
    filename: 'test.css',
    type: 'application/css',
  },
  {
    filename: 'test.mp4',
    type: 'video/mp4',
  },
];

describe('Logs attaching. Launch, suite and tests with different logs', () => {
  ReportingApi.trace(
    'suite TRACE message log',
    null,
    'Logs attaching. Launch, suite and tests with different logs',
  );
  ReportingApi.debug(
    'suite DEBUG message log',
    null,
    'Logs attaching. Launch, suite and tests with different logs',
  );
  ReportingApi.info(
    'suite INFO message log',
    null,
    'Logs attaching. Launch, suite and tests with different logs',
  );
  ReportingApi.warn(
    'suite WARN message log',
    null,
    'Logs attaching. Launch, suite and tests with different logs',
  );
  ReportingApi.error(
    'suite ERROR message log',
    null,
    'Logs attaching. Launch, suite and tests with different logs',
  );
  ReportingApi.fatal(
    'suite FATAL message log',
    null,
    'Logs attaching. Launch, suite and tests with different logs',
  );

  it('test with message logs', () => {
    // launch logs
    ReportingApi.launchTrace('TRACE message log');
    ReportingApi.launchDebug('DEBUG message log');
    ReportingApi.launchInfo('INFO message log');
    ReportingApi.launchWarn('WARN message log');
    ReportingApi.launchError('ERROR message log');
    ReportingApi.launchFatal('FATAL message log');
    // test logs
    ReportingApi.trace('TRACE message log');
    ReportingApi.debug('DEBUG message log');
    ReportingApi.info('INFO message log');
    ReportingApi.warn('WARN message log');
    ReportingApi.error('ERROR message log');
    ReportingApi.fatal('FATAL message log');
    expect(true).toBe(true);
  });

  it('test with attachments', async () => {
    const readFilesPromises = attachments.map(
      ({ filename, type }) =>
        new Promise((resolve) =>
          fs.readFile(path.resolve(__dirname, './attachments', filename), (err, data) => {
            if (err) {
              throw err;
            }
            const attachment = {
              name: filename,
              type,
              content: data.toString('base64'),
            };
            console.log(filename);
            ReportingApi.info('info log with attachment', attachment);
            resolve();
          }),
        ),
    );
    await Promise.all(readFilesPromises);
    expect(true).toBe(true);
  });
});
