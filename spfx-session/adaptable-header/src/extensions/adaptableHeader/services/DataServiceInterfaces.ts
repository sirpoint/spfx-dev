import { SPHttpClient } from "@microsoft/sp-http";

export interface IHttpConfiguration{
    spHttpClient: SPHttpClient;
    siteAbsoluteUrl: string;
    context: any;
}
