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
import { getAgentInfo, getClientConfig, getStartLaunchObj } from './utils';
import { ReportPortalServiceOptions } from './models';

export class ReportPortalService {
  private options: ReportPortalServiceOptions;
  private client: RPClient;
  private launchId: string | null = null;
  private tempLaunchId: string | null = null;

  constructor(options: ReportPortalServiceOptions) {
    this.options = options;
  }

  async onPrepare(): Promise<void> {
    if (process.env.RP_LAUNCH_ID) return;

    this.client = new RPClient(getClientConfig(this.options), getAgentInfo());

    const launchObj = getStartLaunchObj(this.options, { name: this.options.launch });
    const { tempId, promise } = this.client.startLaunch(launchObj);

    this.tempLaunchId = tempId;
    const response = await promise;
    this.launchId = response.id;
    process.env.RP_LAUNCH_ID = this.launchId;
  }

  async onComplete(): Promise<void> {
    if (!this.tempLaunchId) return;

    await this.client.getPromiseFinishAllItems(this.tempLaunchId);
    await this.client.finishLaunch(this.tempLaunchId, { endTime: Date.now() }).promise;

    this.launchId = null;
    this.tempLaunchId = null;
    delete process.env.RP_LAUNCH_ID;
  }

  getLaunchId(): string | null {
    return this.launchId || process.env.RP_LAUNCH_ID || null;
  }
}
