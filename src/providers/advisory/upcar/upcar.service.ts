import { Injectable, Logger } from "@nestjs/common";
import { CROP_MAPPINGS, readMultipleJSONs } from "../../../app.utils";
import { mapAdvisoryData } from "../../../beckn.utils";

@Injectable()
export class UPCARAdvisoryService {
  constructor(private readonly logger: Logger) {}

  /**
   * Fetches advisory data from UPCAR
   * @returns advisory data in english and hindi
   */
  private async fetchAdvisoryDataFromUPCAR() {
    try {
      const startTime = performance.now();
      const filePaths = ['upcar/latest.json', 'upcar/latest_hindi.json'];
      const [englishData, hindiData] = await readMultipleJSONs(filePaths);
      const endTime = performance.now();
      this.logger.verbose(
        `Time taken to get upcar data: ${endTime - startTime}`,
      );
      return { englishData, hindiData };
    } catch (err) {
      this.logger.error('Error while fetching advisory data from UPCAR', err);
    }
  }

  /**
   * Maps advisory data from UPCAR
   * @returns advisory data in english and hindi
   */
  async getAdvisory() {
    try {
      const { englishData, hindiData } = await this.fetchAdvisoryDataFromUPCAR();
      const upcarItems = mapAdvisoryData(englishData, 'upcar');
      const upcarHindiProvider = mapAdvisoryData(hindiData, 'upcar');
      const hindiItems = upcarHindiProvider.items.map((item) => {
        if (CROP_MAPPINGS[item.code]) {
          item.descriptor.name = CROP_MAPPINGS[item.code].hi;
        }
        item.category_ids.push('hi_translated');
        return item;
      });
      upcarItems.items.push(...hindiItems);
      upcarItems.categories.push({
        id: 'hi_translated',
      });
      return upcarItems;
    } catch (err) {
      this.logger.error('Error fetching advisory data from UPCAR', err);
    }
  }

  // TODO: Add advisory data typescript type
  async updateAdvisory(data) {
    // TODO: Integrate MinIO to upload and save advisory data
    // TODO: Use update functions to update advisory data
    return { message: 'Advisory updated successfully' };
  }
}
