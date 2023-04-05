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

  @ApiModelProperty()
  totalLEAD0: number;

  @ApiModelProperty()
  totalLEAD1: number;

  @ApiModelProperty()
  totalLEAD2: number;

  @ApiModelProperty()
  totalLEAD3: number;

  @ApiModelProperty()
  totalLEAD4: number;

  @ApiModelProperty()
  totalLEAD5: number;

  @ApiModelProperty()
  totalLEAD6: number;



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

  @ApiModelProperty({ isArray: true, type: Landmark })
  lead0: Landmark[];
  @ApiModelProperty({ isArray: true, type: Landmark })
  lead1: Landmark[];
  @ApiModelProperty({ isArray: true, type: Landmark })
  lead2: Landmark[];
  @ApiModelProperty({ isArray: true, type: Landmark })
  lead3: Landmark[];
  @ApiModelProperty({ isArray: true, type: Landmark })
  lead4: Landmark[];
  @ApiModelProperty({ isArray: true, type: Landmark })
  lead5: Landmark[];
  @ApiModelProperty({ isArray: true, type: Landmark })
  lead6: Landmark[];


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
    lead0: Landmark[],
    lead1: Landmark[],
    lead2: Landmark[],
    lead3: Landmark[],
    lead4: Landmark[],
    lead5: Landmark[],
    lead6: Landmark[],
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

    this.totalLEAD0 = lead0.length;
    this.lead0 = lead0;

    this.totalLEAD1 = lead1.length;
    this.lead1 = lead1;

    this.totalLEAD2 = lead2.length;
    this.lead2 = lead2;

    this.totalLEAD3 = lead3.length;
    this.lead3 = lead3;

    this.totalLEAD4 = lead4.length;
    this.lead4 = lead4;

    this.totalLEAD5 = lead5.length;
    this.lead5 = lead5;

    this.totalLEAD6 = lead6.length;
    this.lead6 = lead6;

    
    

    

  }
}
