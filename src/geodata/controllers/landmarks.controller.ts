import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from '../services/landmarks.service';
import { Landmark } from '../types/landmarks/landmark.type';
import { LandmarksResponse, LandmarksSummaryResponse } from '../responses';

@Controller('landmarks')
@ApiTags('Landmarks')
@ApiExtraModels(Landmark)
export class LandmarksController {
  constructor(private landmarksService: LandmarksService) {}

  @Get('summary')
  @ApiQuery({ type: String, name: 'zipCode' })
  getLandmarksSummary(
    @Query('zipCode') zipCode: string,
  ): LandmarksSummaryResponse {
    const parks = this.landmarksService.getParks(zipCode);
    const libraries = this.landmarksService.getLibraries(zipCode);
    const communityCenters = this.landmarksService.getCommunityCenters(zipCode);
    const ccf = this.landmarksService.getChildCareF(zipCode);
    const ccc = this.landmarksService.getChildCareC(zipCode);
    const ca = this.landmarksService.getCA(zipCode);
    const cbr = this.landmarksService.getCBR(zipCode);
    const cd = this.landmarksService.getCD(zipCode);
    const ct = this.landmarksService.getCT(zipCode);
    const co = this.landmarksService.getCO(zipCode);
    const cw = this.landmarksService.getCW(zipCode);
    const lead0 = this.landmarksService.getLEAD0(zipCode);
    const lead1 = this.landmarksService.getLEAD1(zipCode);
    const lead2 = this.landmarksService.getLEAD2(zipCode);
    const lead3 = this.landmarksService.getLEAD3(zipCode);
    const lead4 = this.landmarksService.getLEAD4(zipCode);
    const lead5 = this.landmarksService.getLEAD5(zipCode);
    const lead6 = this.landmarksService.getLEAD6(zipCode);
    const covidvacc= this.landmarksService.getCOVIDVACC(zipCode);
    const covidcase= this.landmarksService.getCOVIDCASE(zipCode);
;
    return new LandmarksSummaryResponse(
      parks,
      communityCenters,
      libraries,
      ccf,
      ccc,
      ca,
      cbr,
      cd,
      ct,
      co,
      cw,
      lead0,
      lead1,
      lead2,
      lead3,
      lead4,
      lead5,
      lead6,
      covidvacc,
      covidcase,);
  }

  @Get('parks')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getParks(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const parks = this.landmarksService.getParks(zipCode);

    return new LandmarksResponse(parks);
  }

  @Get('libraries')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLibraries(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const libraries = this.landmarksService.getLibraries(zipCode);

    return new LandmarksResponse(libraries);
  }

  @Get('community')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCommunityCenters(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const centers = this.landmarksService.getCommunityCenters(zipCode);

    return new LandmarksResponse(centers);
  }

  @Get('cc_family')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getChildCareF(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const ccf = this.landmarksService.getChildCareF(zipCode);

    return new LandmarksResponse(ccf);
  }

  @Get('cc_center')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getChildCareC(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const ccc = this.landmarksService.getChildCareC(zipCode);

    return new LandmarksResponse(ccc);
  }

  @Get('cr_assault')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCA(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const ca = this.landmarksService.getCA(zipCode);

    return new LandmarksResponse(ca);
  }

  @Get('cr_burgrob')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCBR(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const cbr = this.landmarksService.getCBR(zipCode);

    return new LandmarksResponse(cbr);
  }

  @Get('cr_drug')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCD(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const cd = this.landmarksService.getCD(zipCode);

    return new LandmarksResponse(cd);
  }

  @Get('cr_theft')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCT(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const ct = this.landmarksService.getCT(zipCode);

    return new LandmarksResponse(ct);
  }

  @Get('cr_trafficother')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCO(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const co = this.landmarksService.getCO(zipCode);

    return new LandmarksResponse(co);
  }

  @Get('cr_weapon')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCW(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const cw = this.landmarksService.getCW(zipCode);

    return new LandmarksResponse(cw);
  }

  @Get('lead_data0')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLEAD0(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const lead0 = this.landmarksService.getLEAD0(zipCode);

    return new LandmarksResponse(lead0);
  }
  @Get('lead_data1')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLEAD1(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const lead1 = this.landmarksService.getLEAD1(zipCode);

    return new LandmarksResponse(lead1);
  }
  @Get('lead_data2')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLEAD2(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const lead2 = this.landmarksService.getLEAD2(zipCode);

    return new LandmarksResponse(lead2);
  }
  @Get('lead_data3')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLEAD3(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const lead3 = this.landmarksService.getLEAD3(zipCode);

    return new LandmarksResponse(lead3);
  }
  @Get('lead_data4')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLEAD4(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const lead4 = this.landmarksService.getLEAD4(zipCode);

    return new LandmarksResponse(lead4);
  }
  @Get('lead_data5')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLEAD5(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const lead5 = this.landmarksService.getLEAD5(zipCode);

    return new LandmarksResponse(lead5);
  }
  @Get('lead_data6')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLEAD6(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const lead6 = this.landmarksService.getLEAD6(zipCode);

    return new LandmarksResponse(lead6);
  }

  @Get('covid-data-vacc')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCOVIDVACC(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const covidvacc= this.landmarksService.getCOVIDVACC(zipCode);

    return new LandmarksResponse(covidvacc);
  }

  @Get('covid-data-case')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCOVIDCASE(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const covidcase= this.landmarksService.getCOVIDCASE(zipCode);

    return new LandmarksResponse(covidcase);
  }





}
