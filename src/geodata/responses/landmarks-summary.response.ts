import { Landmark } from '../types/landmarks/landmark.type';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LandmarksSummaryResponse {
  @ApiModelProperty()
  totalParks: number;

  @ApiModelProperty()
  totalCommunityCenters: number;

  @ApiModelProperty()
  totalLibraries: number;

  @ApiModelProperty()
  totalCCF: number;

  @ApiModelProperty()
  totalCCC: number;

  @ApiModelProperty({ isArray: true, type: Landmark })
  parks: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  communityCenters: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  libraries: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  ccf: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  ccc: Landmark[];

  constructor(
    parks: Landmark[],
    communityCenters: Landmark[],
    libraries: Landmark[],
    ccf: Landmark[],
    ccc: Landmark[],
  ) {
    this.totalParks = parks.length;
    this.parks = parks;

    this.totalCommunityCenters = communityCenters.length;
    this.communityCenters = communityCenters;

    this.totalLibraries = libraries.length;
    this.libraries = libraries;

    this.totalCCF = ccf.length;
    this.ccf = ccf;

    this.totalCCC = ccc.length;
    this.ccc = ccc;
  }
}
