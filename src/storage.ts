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

import { AdditionalData, AdditionalSuitesData, Suite, TestItem } from './models';

export class Storage {
  private suites: Suite[] = [];
  private additionalSuitesData: AdditionalSuitesData = {};
  private testItems: TestItem[] = [];

  public addSuite(data: Suite): void {
    this.suites.push(data);
  }

  public getAllSuites(): Suite[] {
    return [...this.suites];
  }

  public getCurrentSuite(): Suite {
    return this.suites[this.suites.length - 1] || null;
  }

  public removeSuite(suiteId: string): void {
    this.suites = this.suites.filter(({ id }) => suiteId !== id);
  }

  public addAdditionalSuiteData(key: string, data: AdditionalData): void {
    this.additionalSuitesData[key] = { ...(this.additionalSuitesData[key] || {}), ...data };
  }

  public getAdditionalSuiteData(key: string): AdditionalData {
    return this.additionalSuitesData[key] || {};
  }

  public addTest(data: TestItem): void {
    this.testItems.push(data);
  }

  public updateCurrentTest(data: Partial<TestItem>): void {
    const lastElemIdx = this.testItems.length - 1;
    this.testItems[lastElemIdx] = { ...this.testItems[lastElemIdx], ...data };
  }

  public getCurrentTest(): TestItem {
    return this.testItems[this.testItems.length - 1] || null;
  }

  public removeTest(testId: string): void {
    this.testItems = this.testItems.filter(({ id }) => testId !== id);
  }
}
