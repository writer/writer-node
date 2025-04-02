// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Writer from 'writer-sdk';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

import retrieve_applications from './applications/retrieve-applications';
import list_applications from './applications/list-applications';
import generate_content_applications from './applications/generate-content-applications';
import create_applications_jobs from './applications/jobs/create-applications-jobs';
import retrieve_applications_jobs from './applications/jobs/retrieve-applications-jobs';
import list_applications_jobs from './applications/jobs/list-applications-jobs';
import retry_applications_jobs from './applications/jobs/retry-applications-jobs';
import update_applications_graphs from './applications/graphs/update-applications-graphs';
import list_applications_graphs from './applications/graphs/list-applications-graphs';
import chat_chat from './chat/chat-chat';
import create_completions from './completions/create-completions';
import list_models from './models/list-models';
import create_graphs from './graphs/create-graphs';
import retrieve_graphs from './graphs/retrieve-graphs';
import update_graphs from './graphs/update-graphs';
import list_graphs from './graphs/list-graphs';
import delete_graphs from './graphs/delete-graphs';
import add_file_to_graph_graphs from './graphs/add-file-to-graph-graphs';
import question_graphs from './graphs/question-graphs';
import remove_file_from_graph_graphs from './graphs/remove-file-from-graph-graphs';
import retrieve_files from './files/retrieve-files';
import list_files from './files/list-files';
import delete_files from './files/delete-files';
import download_files from './files/download-files';
import retry_files from './files/retry-files';
import upload_files from './files/upload-files';
import context_aware_splitting_tools from './tools/context-aware-splitting-tools';
import parse_pdf_tools from './tools/parse-pdf-tools';
import medical_tools_comprehend from './tools/comprehend/medical-tools-comprehend';
import analyze_vision from './vision/analyze-vision';

export const tools: Tool[] = [];

export type HandlerFunction = (client: Writer, args: any) => Promise<any>;
export const handlers: Record<string, HandlerFunction> = {};

function addEndpoint(endpoint: { tool: Tool; handler: HandlerFunction }) {
  tools.push(endpoint.tool);
  handlers[endpoint.tool.name] = endpoint.handler;
}

addEndpoint(retrieve_applications);
addEndpoint(list_applications);
addEndpoint(generate_content_applications);
addEndpoint(create_applications_jobs);
addEndpoint(retrieve_applications_jobs);
addEndpoint(list_applications_jobs);
addEndpoint(retry_applications_jobs);
addEndpoint(update_applications_graphs);
addEndpoint(list_applications_graphs);
addEndpoint(chat_chat);
addEndpoint(create_completions);
addEndpoint(list_models);
addEndpoint(create_graphs);
addEndpoint(retrieve_graphs);
addEndpoint(update_graphs);
addEndpoint(list_graphs);
addEndpoint(delete_graphs);
addEndpoint(add_file_to_graph_graphs);
addEndpoint(question_graphs);
addEndpoint(remove_file_from_graph_graphs);
addEndpoint(retrieve_files);
addEndpoint(list_files);
addEndpoint(delete_files);
addEndpoint(download_files);
addEndpoint(retry_files);
addEndpoint(upload_files);
addEndpoint(context_aware_splitting_tools);
addEndpoint(parse_pdf_tools);
addEndpoint(medical_tools_comprehend);
addEndpoint(analyze_vision);
