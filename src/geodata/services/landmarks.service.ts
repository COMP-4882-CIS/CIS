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

  private readonly allLandmarks: Landmark[];

  constructor() {
    this.allLandmarks = [
      ...this.convertParks(),
      ...this.convertLibraries(),
      ...this.convertCommunityCenters(),
      ...this.convertChildCareF(),
      ...this.convertChildCareC(),
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
}
