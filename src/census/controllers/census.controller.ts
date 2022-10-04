import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CensusAPIService } from '../services/census-api.service';
import { PopulationStatResponse } from '../responses/population-stat.response';

@Controller('census')
@ApiTags('Census')
@UseInterceptors(CacheInterceptor)
export class CensusController {
  constructor(private censusAPIService: CensusAPIService) {}

  @Get('breakdown')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  breakdownRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.breakdownRequest(tract, zipCode);
  }

  @Get('total')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  totalRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.totalRequest(tract, zipCode);
  }

  @Get('Under5')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  under5Request(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.under5Request(tract, zipCode);
  }

  @Get('FiveToNine')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  ageFiveTo9Request(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.ageFiveTo9Request(tract, zipCode);
  }

  @Get('TenTo14')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  ageTenTo14Request(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.ageTenTo14Request(tract, zipCode);
  }

  @Get('FifteenTo19')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  fifteenTo19Request(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.fifteenTo19Request(tract, zipCode);
  }

  @Get('underPovertyLevel')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  childrenUnderPovertyLevelRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.childrenUnderPovertyLevelRequest(
      tract,
      zipCode,
    );
  }
}
