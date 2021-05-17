import Reporter from '@wdio/reporter';
import { Reporters } from '@wdio/types';

// reference - https://www.npmjs.com/package/@wdio/reporter
export class RPReporter extends Reporter {
  constructor(options: Partial<Reporters.Options>) {
    super(options)
  }

  onRunnerStart() {}

  onSuiteStart(suite: any) {}

  onHookStart() {}

  onHookEnd() {}

  onTestStart() {}

  onTestSkip() {}

  onTestPass() {}

  onTestRetry() {}

  onTestFail() {}

  onTestEnd() {}

  onSuiteEnd() {}

  onRunnerEnd() {}

  onBeforeCommand() {}

  onAfterCommand() {}
}
