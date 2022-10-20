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

  @ApiModelProperty()
  totalCA: number;

  @ApiModelProperty()
  totalCBR: number;

  @ApiModelProperty()
  totalCD: number;

  @ApiModelProperty()
  totalCT: number;

  @ApiModelProperty()
  totalCO: number;

  @ApiModelProperty()
  totalCW: number;

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

  @ApiModelProperty({ isArray: true, type: Landmark })
  ca: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  cbr: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  cd: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  ct: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  co: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  cw: Landmark[];

  constructor(
    parks: Landmark[],
    communityCenters: Landmark[],
    libraries: Landmark[],
    ccf: Landmark[],
    ccc: Landmark[],
    ca: Landmark[],
    cbr: Landmark[],
    cd: Landmark[],
    ct: Landmark[],
    co: Landmark[],
    cw: Landmark[],
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

    this.totalCA = ca.length;
    this.ca = ca;

    this.totalCBR = cbr.length;
    this.cbr = cbr;

    this.totalCD = cd.length;
    this.cd = cd;

    this.totalCT = ct.length;
    this.ct = ct;

    this.totalCO = co.length;
    this.co = co;

    this.totalCW = cw.length;
    this.cw = cw;
  }
}
