import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class BuildInfoController {
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      basePath: process.env.BASE_PATH || '',
      service: 'CIS Backend',
    };
  }

  @Get('build-info')
  @ApiOperation({ summary: 'Get build information' })
  @ApiResponse({ status: 200, description: 'Build information retrieved successfully' })
  getBuildInfo() {
    try {
      const buildInfoPath = path.join(process.cwd(), 'build-info', 'versionInfo.json');
      
      if (fs.existsSync(buildInfoPath)) {
        const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, 'utf8'));
        return {
          ...buildInfo,
          buildTime: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'development',
          version: process.env.npm_package_version || '1.0.0',
          basePath: process.env.BASE_PATH || '',
        };
      } else {
        return {
          commitID: 'unknown',
          buildTimestamp: new Date().toISOString(),
          buildersUsername: 'unknown',
          branch: 'unknown',
          repoURL: 'unknown',
          last5commitMessages: 'Build info not available',
          releaseName: 'unknown',
          environment: process.env.NODE_ENV || 'development',
          version: process.env.npm_package_version || '1.0.0',
          basePath: process.env.BASE_PATH || '',
          deploymentURL: 'https://iis.memphis.edu/apis/cis/',
          apiDocsURL: 'https://iis.memphis.edu/apis/cis/api',
          healthCheckURL: 'https://iis.memphis.edu/apis/cis/health',
          buildInfoURL: 'https://iis.memphis.edu/apis/cis/build-info',
        };
      }
    } catch (error) {
      return {
        error: 'Failed to load build information',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        basePath: process.env.BASE_PATH || '',
      };
    }
  }
}
