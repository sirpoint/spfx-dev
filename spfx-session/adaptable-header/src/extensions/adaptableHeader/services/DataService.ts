import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import pnp from 'sp-pnp-js';
import { IHttpConfiguration } from './DataServiceInterfaces';
import { NavigationItem, PageHeaderConfig } from '../common/CommonInterfaces';

export class DataService{
    private spHttpClient: SPHttpClient;
    private siteAbsoluteUrl: string;
    private formDigest: string;
    private context:any;

    constructor(config: IHttpConfiguration){
        this.spHttpClient = config.spHttpClient;
        this.siteAbsoluteUrl = config.siteAbsoluteUrl;
        this.context = config.context;

        pnp.setup({
            spfxContext: this.context,
        });
    }

    public async getNavigation(propertyName: string):Promise<NavigationItem[]>{
        const jsonTenantProperty:string = await pnp.sp.web.getStorageEntity(propertyName);
        let globalNavigation:NavigationItem[] = JSON.parse(jsonTenantProperty);

        return globalNavigation;
    }

    public async getHeaderConfiguration(headerConf: string): Promise<PageHeaderConfig[]> {
        const jsonTenantProperty:string = await pnp.sp.web.getStorageEntity(headerConf);
        let pagetHeaderConf: PageHeaderConfig[] = JSON.parse(jsonTenantProperty);

        return pagetHeaderConf;
    }
}