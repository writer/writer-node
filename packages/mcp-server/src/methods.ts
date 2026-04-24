// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
}

export const sdkMethods: SdkMethod[] = [{
  clientCallName: 'client.applications.retrieve',
  fullyQualifiedName: 'applications.retrieve',
  httpMethod: 'get',
  httpPath: '/v1/applications/{application_id}',
},{
  clientCallName: 'client.applications.list',
  fullyQualifiedName: 'applications.list',
  httpMethod: 'get',
  httpPath: '/v1/applications',
},{
  clientCallName: 'client.applications.generateContent',
  fullyQualifiedName: 'applications.generateContent',
  httpMethod: 'post',
  httpPath: '/v1/applications/{application_id}',
},{
  clientCallName: 'client.applications.jobs.create',
  fullyQualifiedName: 'applications.jobs.create',
  httpMethod: 'post',
  httpPath: '/v1/applications/{application_id}/jobs',
},{
  clientCallName: 'client.applications.jobs.retrieve',
  fullyQualifiedName: 'applications.jobs.retrieve',
  httpMethod: 'get',
  httpPath: '/v1/applications/jobs/{job_id}',
},{
  clientCallName: 'client.applications.jobs.list',
  fullyQualifiedName: 'applications.jobs.list',
  httpMethod: 'get',
  httpPath: '/v1/applications/{application_id}/jobs',
},{
  clientCallName: 'client.applications.jobs.retry',
  fullyQualifiedName: 'applications.jobs.retry',
  httpMethod: 'post',
  httpPath: '/v1/applications/jobs/{job_id}/retry',
},{
  clientCallName: 'client.applications.graphs.update',
  fullyQualifiedName: 'applications.graphs.update',
  httpMethod: 'put',
  httpPath: '/v1/applications/{application_id}/graphs',
},{
  clientCallName: 'client.applications.graphs.list',
  fullyQualifiedName: 'applications.graphs.list',
  httpMethod: 'get',
  httpPath: '/v1/applications/{application_id}/graphs',
},{
  clientCallName: 'client.chat.chat',
  fullyQualifiedName: 'chat.chat',
  httpMethod: 'post',
  httpPath: '/v1/chat',
},{
  clientCallName: 'client.completions.create',
  fullyQualifiedName: 'completions.create',
  httpMethod: 'post',
  httpPath: '/v1/completions',
},{
  clientCallName: 'client.models.list',
  fullyQualifiedName: 'models.list',
  httpMethod: 'get',
  httpPath: '/v1/models',
},{
  clientCallName: 'client.graphs.create',
  fullyQualifiedName: 'graphs.create',
  httpMethod: 'post',
  httpPath: '/v1/graphs',
},{
  clientCallName: 'client.graphs.retrieve',
  fullyQualifiedName: 'graphs.retrieve',
  httpMethod: 'get',
  httpPath: '/v1/graphs/{graph_id}',
},{
  clientCallName: 'client.graphs.update',
  fullyQualifiedName: 'graphs.update',
  httpMethod: 'put',
  httpPath: '/v1/graphs/{graph_id}',
},{
  clientCallName: 'client.graphs.list',
  fullyQualifiedName: 'graphs.list',
  httpMethod: 'get',
  httpPath: '/v1/graphs',
},{
  clientCallName: 'client.graphs.delete',
  fullyQualifiedName: 'graphs.delete',
  httpMethod: 'delete',
  httpPath: '/v1/graphs/{graph_id}',
},{
  clientCallName: 'client.graphs.addFileToGraph',
  fullyQualifiedName: 'graphs.addFileToGraph',
  httpMethod: 'post',
  httpPath: '/v1/graphs/{graph_id}/file',
},{
  clientCallName: 'client.graphs.question',
  fullyQualifiedName: 'graphs.question',
  httpMethod: 'post',
  httpPath: '/v1/graphs/question',
},{
  clientCallName: 'client.graphs.removeFileFromGraph',
  fullyQualifiedName: 'graphs.removeFileFromGraph',
  httpMethod: 'delete',
  httpPath: '/v1/graphs/{graph_id}/file/{file_id}',
},{
  clientCallName: 'client.files.retrieve',
  fullyQualifiedName: 'files.retrieve',
  httpMethod: 'get',
  httpPath: '/v1/files/{file_id}',
},{
  clientCallName: 'client.files.list',
  fullyQualifiedName: 'files.list',
  httpMethod: 'get',
  httpPath: '/v1/files',
},{
  clientCallName: 'client.files.delete',
  fullyQualifiedName: 'files.delete',
  httpMethod: 'delete',
  httpPath: '/v1/files/{file_id}',
},{
  clientCallName: 'client.files.download',
  fullyQualifiedName: 'files.download',
  httpMethod: 'get',
  httpPath: '/v1/files/{file_id}/download',
},{
  clientCallName: 'client.files.retry',
  fullyQualifiedName: 'files.retry',
  httpMethod: 'post',
  httpPath: '/v1/files/retry',
},{
  clientCallName: 'client.files.upload',
  fullyQualifiedName: 'files.upload',
  httpMethod: 'post',
  httpPath: '/v1/files',
},{
  clientCallName: 'client.tools.parsePdf',
  fullyQualifiedName: 'tools.parsePdf',
  httpMethod: 'post',
  httpPath: '/v1/tools/pdf-parser/{file_id}',
},{
  clientCallName: 'client.tools.webSearch',
  fullyQualifiedName: 'tools.webSearch',
  httpMethod: 'post',
  httpPath: '/v1/tools/web-search',
},{
  clientCallName: 'client.translation.translate',
  fullyQualifiedName: 'translation.translate',
  httpMethod: 'post',
  httpPath: '/v1/translation',
},{
  clientCallName: 'client.vision.analyze',
  fullyQualifiedName: 'vision.analyze',
  httpMethod: 'post',
  httpPath: '/v1/vision',
}];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods.filter((method) => method.httpMethod === 'get').forEach(
        (method) => allowedMethodsSet.add(method)
      );
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(`Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`);
        }
      });

      sdkMethods.filter((method) =>
          allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName))
        ).forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(`Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`);
      }
    });

    allowedMethods = allowedMethods.filter((method) =>
      !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName))
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
