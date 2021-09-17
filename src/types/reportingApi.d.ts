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

declare module '@reportportal/client-javascript/lib/publicReportingAPI' {
  import { RP_STATUSES } from '@reportportal/client-javascript/lib/constants/statuses';

  export default class {
    static addAttributes(attributes: Interfaces.Attribute[], suite?: string): void;
    static setDescription(text: string, suite?: string): void;
    static setLaunchStatus(status: RP_STATUSES): void;
    static setStatus(status: RP_STATUSES, suite?: string): void;
    static addLog(log: Interfaces.LogRQ, suite?: string): void;
    static addLaunchLog(log: Interfaces.LogRQ, suite?: string): void;
  }
}
