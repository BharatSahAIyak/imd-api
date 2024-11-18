import { Injectable, Logger } from '@nestjs/common';
import { OUAT_ORIA_DISTRICTS } from '../../../app.constants';
import { readMultipleJSONs } from '../../../app.utils';
import { ODISHA_DISTRICTS } from '../../../constants/odisha-districts';

@Injectable()
export class OUATAdvisoryService {
  constructor(private readonly logger: Logger) {}

  private async fetchAdvisoryDataFromOUAT(district: string) {
    district = !ODISHA_DISTRICTS.includes(district.toLowerCase())
      ? 'khordha'
      : district.toLowerCase();

    // fetching data from OUAT
    const startTime = performance.now();
    const filePaths = [`ouat/${district}.json`, `ouat/odia/${district}.json`];
    const [englishData, odiaData]: any[] =
      await readMultipleJSONs(filePaths);
    const endTime = performance.now();
    this.logger.verbose(
      `Time taken to read OUAT data JSON: ${endTime - startTime}`,
    );
    delete englishData['weather_details'];
    delete odiaData['weather_details'];
    englishData['district'] = district;
    odiaData['district'] = OUAT_ORIA_DISTRICTS[district];
    return { englishData, odiaData };
  }

  /**
   * Fetches advisory data from OUAT
   * @returns advisory data
   */
  async getAdvisory(district: string) {
    try {
      const advisory = await this.fetchAdvisoryDataFromOUAT(district);
      return advisory;
    } catch (err) {
      this.logger.error('Error fetching advisory data from OUAT', err);
    }
  }

  async updateAdvisory(data: any) {
    // TODO: Integrate MinIO to upload and save advisory data
    // TODO: Use update functions to update advisory data
    return { message: 'Advisory updated successfully' };
  }
}
