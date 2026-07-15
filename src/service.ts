/*
 *  Copyright 2025 EPAM Systems
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

import RPClient from '@reportportal/client-javascript';
import clientHelpers from '@reportportal/client-javascript/lib/helpers';
import { getAgentInfo, getClientConfig, getStartLaunchObj } from './utils';
import { Config } from './models';

export class ReportPortalService {
  private readonly options: Config;
  private client: RPClient;
  private launchId: string | null = null;
  private tempLaunchId: string | null = null;

  constructor(options: Config) {
    this.options = options;
  }

  async onPrepare(): Promise<void> {
    if (process.env.RP_LAUNCH_ID) return;

    // Use provided launchId without starting a new one
    if (this.options.launchId) {
      process.env.RP_LAUNCH_ID = this.options.launchId;
      return;
    }

    this.client = new RPClient(getClientConfig(this.options), getAgentInfo());

    const launchObj = getStartLaunchObj(this.options);
    const { tempId, promise } = this.client.startLaunch(launchObj);

    try {
      const response = await promise;
      this.tempLaunchId = tempId;
      this.launchId = response.id;
      process.env.RP_LAUNCH_ID = this.launchId;
    } catch (error) {
      console.warn('ReportPortalService. Cannot start launch: ', error);
    }
  }

  async onComplete(): Promise<void> {
    // Skip finishing external launch
    if (this.options.launchId) {
      delete process.env.RP_LAUNCH_ID;
      return;
    }

    if (!this.tempLaunchId) return;

    try {
      await this.client.finishLaunch(this.tempLaunchId, { endTime: clientHelpers.now() }).promise;
      this.launchId = null;
      this.tempLaunchId = null;
      delete process.env.RP_LAUNCH_ID;
    } catch (error) {
      console.warn(`ReportPortalService. Cannot finish launch with id ${this.launchId}: `, error);
    }
  }
}
