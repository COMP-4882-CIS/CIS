import { Injectable } from '@nestjs/common';
import { FeatureCollection } from '../types/feature-collection.type';
import { Landmark } from '../types/landmarks/landmark.type';
import { LandmarkType } from '../types/landmarks/landmark-type.enum';

@Injectable()
export class LandmarksService {
  private rawParkData: FeatureCollection = require('../data/parks.json');
  private rawLibraryData: FeatureCollection = require('../data/libraries.json');
  private rawCommunityCenterData: FeatureCollection = require('../data/centers.json');
  private rawCCFData: FeatureCollection = require('../data/cs_family.json');
  private rawCCCData: FeatureCollection = require('../data/cs_center.json');
  private rawCAData: FeatureCollection = require('../data/cr_assault.json');
  private rawCBRData: FeatureCollection = require('../data/cr_burgrob.json');
  private rawCDData: FeatureCollection = require('../data/cr_drug.json');
  private rawCTData: FeatureCollection = require('../data/cr_theft.json');
  private rawCOData: FeatureCollection = require('../data/cr_trafficother.json');
  private rawCWData: FeatureCollection = require('../data/cr_weapon.json');
  private rawLEAD0Data: FeatureCollection = require('../data/lead_data0.json');
  private rawLEAD1Data: FeatureCollection = require('../data/lead_data1.json');
  private rawLEAD2Data: FeatureCollection = require('../data/lead_data2.json');
  private rawLEAD3Data: FeatureCollection = require('../data/lead_data3.json');
  private rawLEAD4Data: FeatureCollection = require('../data/lead_data4.json');
  private rawLEAD5Data: FeatureCollection = require('../data/lead_data5.json');
  private rawLEAD6Data: FeatureCollection = require('../data/lead_data6.json');
  private rawCOVIDVACCData:FeatureCollection = require('../data/covid-data-vacc.json');
  private rawCOVIDCASEData:FeatureCollection = require('../data/covid-data-case.json');


  private readonly allLandmarks: Landmark[];

  constructor() {
    this.allLandmarks = [
      ...this.convertParks(),
      ...this.convertLibraries(),
      ...this.convertCommunityCenters(),
      ...this.convertChildCareF(),
      ...this.convertChildCareC(),
      ...this.convertCA(),
      ...this.convertCBR(),
      ...this.convertCD(),
      ...this.convertCT(),
      ...this.convertCO(),
      ...this.convertCW(),
      ...this.convertLEAD0(),
      ...this.convertLEAD1(),
      ...this.convertLEAD2(),
      ...this.convertLEAD3(),
      ...this.convertLEAD4(),
      ...this.convertLEAD5(),
      ...this.convertLEAD6(),
      ...this.convertCOVIDCASE(),
      ...this.convertCOVIDVACC(),
    ];
  }

  public getParks(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.PARK)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getLibraries(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LIBRARY)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getCommunityCenters(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.COMMUNITY_CENTER)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getChildCareF(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CCF)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getChildCareC(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CCC)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getCA(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CA)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getCBR(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CBR)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getCD(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CD)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getCT(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CT)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getCO(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CO)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getCW(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.CW)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }

        return true;
      });
  }

  public getLEAD0(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LEAD0)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }
  public getLEAD1(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LEAD1)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }
  public getLEAD2(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LEAD2)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }
  public getLEAD3(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LEAD3)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }
  public getLEAD4(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LEAD4)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }
  public getLEAD5(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LEAD5)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }
  public getLEAD6(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.LEAD6)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }

  public getCOVIDVACC(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.COVIDVACC)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }

  public getCOVIDCASE(inZipCode?: string): Landmark[] {
    return this.allLandmarks
      .filter((landmark) => landmark.type === LandmarkType.COVIDCASE)
      .filter((landmark) => {
        if (inZipCode !== undefined && inZipCode.length > 0) {
          return landmark.zipCode === inZipCode;
        }
        return true;
      });
  }

  private convertLibraries(): Landmark[] {
    return this.rawLibraryData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('user_name') &&
          feature.properties.hasOwnProperty('postal') &&
          !!feature.properties['user_name'] &&
          !!feature.properties['postal']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.LIBRARY,
            feature.properties['user_name'],
            feature.properties['postal'],
            feature.geometry,
          ),
      );
  }

  private convertParks(): Landmark[] {
    return this.rawParkData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('park_nam_1') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['park_nam_1'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.PARK,
            feature.properties['park_nam_1'],
            feature.properties['zipcode'],
            feature.geometry,
          ),
      );
  }

  private convertCommunityCenters(): Landmark[] {
    return this.rawCommunityCenterData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('community_') &&
          feature.properties.hasOwnProperty('zip') &&
          !!feature.properties['community_'] &&
          !!feature.properties['zip']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.COMMUNITY_CENTER,
            feature.properties['community_'],
            feature.properties['zip'],
            feature.geometry,
          ),
      );
  }

  private convertChildCareF(): Landmark[] {
    return this.rawCCFData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Address') &&
          feature.properties.hasOwnProperty('Zip') &&
          !!feature.properties['Address'] &&
          !!feature.properties['Zip']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CCF,
            feature.properties['Address'],
            feature.properties['Zip'],
            feature.geometry,
          ),
      );
  }

  private convertChildCareC(): Landmark[] {
    return this.rawCCCData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Address') &&
          feature.properties.hasOwnProperty('Zip') &&
          !!feature.properties['Address'] &&
          !!feature.properties['Zip']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CCC,
            feature.properties['Address'],
            feature.properties['Zip'],
            feature.geometry,
          ),
      );
  }

  private convertCA(): Landmark[] {
    return this.rawCAData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Block Address') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['Block Address'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CA,
            feature.properties['Block Address'],
            feature.properties['zipcode'],
            feature.geometry,
          ),
      );
  }

  private convertCBR(): Landmark[] {
    return this.rawCBRData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Block Address') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['Block Address'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CBR,
            feature.properties['Block Address'],
            feature.properties['zipcode'],
            feature.geometry,
          ),
      );
  }

  private convertCD(): Landmark[] {
    return this.rawCDData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Block Address') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['Block Address'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CD,
            feature.properties['Block Address'],
            feature.properties['zipcode'],
            feature.geometry,
          ),
      );
  }

  private convertCT(): Landmark[] {
    return this.rawCTData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Block Address') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['Block Address'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CT,
            feature.properties['Block Address'],
            feature.properties['zipcode'],
            feature.geometry,
          ),
      );
  }

  private convertCO(): Landmark[] {
    return this.rawCOData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Block Address') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['Block Address'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CO,
            feature.properties['Block Address'],
            feature.properties['zipcode'],
            feature.geometry,
          ),
      );
  }

  private convertCW(): Landmark[] {
    return this.rawCWData.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Block Address') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['Block Address'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
          new Landmark(
            LandmarkType.CW,
            feature.properties['Block Address'],
            feature.properties['zipcode'],
            feature.geometry,
          ),
      );
  }

  private convertLEAD0(): Landmark[] {
    return this.rawLEAD0Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('age') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['age'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.LEAD0,
          feature.properties['age'],
          feature.properties['zipcode'],
          feature.geometry,
        ),
      );
  }

  private convertLEAD1(): Landmark[] {
    return this.rawLEAD1Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('age') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['age'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.LEAD1,
          feature.properties['age'],
          feature.properties['zipcode'],
          feature.geometry,
        ),
      );
  }
  private convertLEAD2(): Landmark[] {
    return this.rawLEAD2Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('age') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['age'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.LEAD2,
          feature.properties['age'],
          feature.properties['zipcode'],
          feature.geometry,
        ),
      );
  }
  private convertLEAD3(): Landmark[] {
    return this.rawLEAD3Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('age') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['age'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.LEAD3,
          feature.properties['age'],
          feature.properties['zipcode'],
          feature.geometry,
        ),
      );
  }
  private convertLEAD4(): Landmark[] {
    return this.rawLEAD4Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('age') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['age'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.CW,
          feature.properties['age'],
          feature.properties['zipcode'],
          feature.geometry,
        ),
      );
  }
  private convertLEAD5(): Landmark[] {
    return this.rawLEAD5Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('age') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['age'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.LEAD5,
          feature.properties['age'],
          feature.properties['zipcode'],
          feature.geometry,
        ),
      );
  }
  private convertLEAD6(): Landmark[] {
    return this.rawLEAD6Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('age') &&
          feature.properties.hasOwnProperty('zipcode') &&
          !!feature.properties['age'] &&
          !!feature.properties['zipcode']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.LEAD6,
          feature.properties['age'],
          feature.properties['zipcode'],
          feature.geometry,
        ),
      );
  }
  private convertCOVIDVACC(): Landmark[] {
    return this.rawLEAD6Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Covid-19 Vaccination, Number of Children < 18yrs with at least one dose, as of 11\/10\/2022') &&
          feature.properties.hasOwnProperty('Covid-19 Vaccination, Percent of Children < 18yrs with at least one dose (%), as of 11\/10\/2022') &&
          feature.properties.hasOwnProperty('Zip') &&
          !!feature.properties['Covid-19 Vaccination, Number of Children < 18yrs with at least one dose, as of 11\/10\/2022'] &&
          !!feature.properties['Covid-19 Vaccination, Percent of Children < 18yrs with at least one dose (%), as of 11\/10\/2022'] &&
          !!feature.properties['Zip']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.COVIDVACC,
          feature.properties['Covid-19 Vaccination, Number of Children < 18yrs with at least one dose, as of 11\/10\/2022'],
          feature.properties['Zip'],
          feature.geometry,
        ),
      );
  }

  private convertCOVIDCASE(): Landmark[] {
    return this.rawLEAD6Data.features
      .filter((feature) => {
        return (
          !!feature.properties &&
          feature.properties.hasOwnProperty('Covid-19, < 18yrs , Cumulative Case Count, 2020-2022') &&
          feature.properties.hasOwnProperty('Covid-19, < 18yrs, Cumulative Case Rate per 100 persons, 2020-2022') &&
          feature.properties.hasOwnProperty('Zip') &&
          !!feature.properties['Covid-19, < 18yrs , Cumulative Case Count, 2020-2022'] &&
          !!feature.properties['Covid-19, < 18yrs, Cumulative Case Rate per 100 persons, 2020-2022'] &&
          !!feature.properties['Zip']
        );
      })
      .map(
        (feature) =>
        new Landmark(
          LandmarkType.COVIDCASE,
          feature.properties['Covid-19, < 18yrs , Cumulative Case Count, 2020-2022'],
          feature.properties['Zip'],
          feature.geometry,
        ),
      );
  }
}
