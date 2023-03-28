import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ZipBreakdownRequest {
  @ApiModelProperty({ required: true })
  zipCode: number;

  @ApiModelProperty({ required: true })
  totalPopulation: number;

  @ApiModelProperty({ required: true })
  populationUnder18: number;

  @ApiModelProperty({ required: true })
  populationUnder18Male: number;

  @ApiModelProperty({ required: true })
  populationUnder18Female: number;

  @ApiModelProperty({ required: true })
  populationInPovertyUnder6: number;

  @ApiModelProperty({ required: true })
  populationInPoverty6To11: number;

  @ApiModelProperty({ required: true })
  populationInPoverty12To17: number;

  @ApiModelProperty({ required: true })
  parkCount: number;

  @ApiModelProperty({ required: true })
  libraryCount: number;

  @ApiModelProperty({ required: true })
  communityCenterCount: number;

  @ApiModelProperty({ required: true })
  CCCCount: number;

  @ApiModelProperty({ required: true })
  CCFCount: number;

  @ApiModelProperty({ required: true })
  CACount: number;

  @ApiModelProperty({ required: true })
  LEAD0Count: number;

  @ApiModelProperty({ required: true })
  LEAD1Count: number;

  @ApiModelProperty({ required: true })
  LEAD2Count: number;

  @ApiModelProperty({ required: true })
  LEAD3Count: number;

  @ApiModelProperty({ required: true })
  LEAD4Count: number;

  @ApiModelProperty({ required: true })
  LEAD5Count: number;

  @ApiModelProperty({ required: true })
  LEAD6Count: number;
}
