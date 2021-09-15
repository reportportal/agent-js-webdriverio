const { ReportingApi } = require('@reportportal/agent-js-webdriverio/src/reportingApi');

describe('Manual status attaching. Suite with STOPPED status', () => {
  ReportingApi.setStatusStopped('Manual status attaching. Suite with STOPPED status');

  it('Test with PASSED status', () => {
    ReportingApi.setStatusPassed();
    expect(true).toBe(false);
  });

  it('Test with FAILED status', () => {
    ReportingApi.setStatusFailed();
    expect(true).toBe(true);
  });

  it('Test with SKIPPED status', () => {
    ReportingApi.setStatusSkipped();
    expect(true).toBe(true);
  });

  it('Test with STOPPED status', () => {
    ReportingApi.setStatusStopped();
    expect(true).toBe(true);
  });

  it('Test with INTERRUPTED status', () => {
    ReportingApi.setStatusInterrupted();
    expect(true).toBe(true);
  });

  it('Test with CANCELLED status', () => {
    ReportingApi.setStatusCancelled();
    expect(true).toBe(true);
  });

  it('Test with INFO status', () => {
    ReportingApi.setStatusInfo();
    expect(true).toBe(true);
  });

  it('Test with WARN status', () => {
    ReportingApi.setStatusWarn();
    expect(true).toBe(true);
  });
});
