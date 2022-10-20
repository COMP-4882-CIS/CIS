import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ZipBreakdownRequest {
  @ApiModelProperty({ required: true })
  zipCode: number;

  @ApiModelProperty({ required: true })
  totalPopulation: number;

  @ApiModelProperty({ required: true })
  ageUnder5: number;

  @ApiModelProperty({ required: true })
  age5To9: number;

  @ApiModelProperty({ required: true })
  age10To14: number;

  @ApiModelProperty({ required: true })
  age15To19: number;

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
  CBRCount: number;

  @ApiModelProperty({ required: true })
  CDCount: number;

  @ApiModelProperty({ required: true })
  CTCount: number;

  @ApiModelProperty({ required: true })
  COCount: number;

  @ApiModelProperty({ required: true })
  CWCount: number;
}
