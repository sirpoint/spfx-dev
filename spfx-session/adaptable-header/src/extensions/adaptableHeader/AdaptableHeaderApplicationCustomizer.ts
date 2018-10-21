import * as React from 'react';
import * as ReactDom from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log, ServiceScope } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AdaptableHeaderApplicationCustomizerStrings';
import { AdaptableTopAreaProps } from './components/AdaptableTopAreaProps';
import AdaptableTopArea from './components/AdaptableTopArea';
import { DataService } from './services/DataService';
import { NavigationItem } from './common/CommonInterfaces';
import { PageHeaderConfig } from '../../../lib/extensions/adaptableHeader/common/CommonInterfaces';
import { StringConstants } from './common/StringConstants';
import { ComponentsToShow } from './common/enums';

const LOG_SOURCE: string = 'AdaptableHeaderApplicationCustomizer';


export interface IAdaptableHeaderApplicationCustomizerProperties {
  testMessage: string;
}

export default class AdaptableHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<IAdaptableHeaderApplicationCustomizerProperties> {
  private _topPlaceHolder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this._renderTopPlaceHolder);
    this._renderTopPlaceHolder();

    return Promise.resolve<void>();
  }

  private async _renderTopPlaceHolder() {
    console.log(StringConstants.LogMessages.RenderMethod);
    console.log(
      StringConstants.LogMessages.AvailabblePlaceholders,
      this.context.placeholderProvider.placeholderNames
        .map(name => PlaceholderName[name])
        .join(", ")
    );

    if (!this._topPlaceHolder) {
      this._topPlaceHolder = 
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose }
      );
      if (!this._topPlaceHolder) {
        Log.error(StringConstants.LogMessages.TopAreaSource, new Error(StringConstants.LogMessages.TopAreaNotFound), this.context.serviceScope);
      }

      const pageUrl: string = this.context.pageContext.web.absoluteUrl;
      const urlArray:string[] = this.context.pageContext.site.serverRequestPath.split("/");
      const pageName: string = urlArray[urlArray.length-1];

      let dataService:DataService = new DataService({
        spHttpClient: this.context.spHttpClient,
        siteAbsoluteUrl: pageUrl,
        context: this.context,
      });
      
      const pageHeaderConfig: PageHeaderConfig = await dataService.getHeaderConfiguration(pageName);
      const globalNavigation:NavigationItem[] = await dataService.getNavigation(StringConstants.GlobalNavigationKey);
      
      const isShortcutsIncluded = pageHeaderConfig.componentsToShow.filter(componentsToShow => ComponentsToShow.Shortcuts).length > 0;
      const isAdaptableSearchBoxIncluded = pageHeaderConfig.componentsToShow.filter(componentsToShow => ComponentsToShow.Shortcuts).length > 0;

      let shortcutItems: NavigationItem[];
      if (isShortcutsIncluded)
            shortcutItems = await dataService.getNavigation(StringConstants.ShortcutsNavigationKey);

      // if (isAdaptableSearchBoxIncluded)

      const adaptableTopArea: React.ReactElement<AdaptableTopAreaProps> = React.createElement(
        AdaptableTopArea,
        {
          title: '',
          globalNavigationItems: globalNavigation,
          shortcutItems: shortcutItems,
          pageHeaderConfig: pageHeaderConfig,
          currentUrl: this.context.pageContext.site.absoluteUrl,
        }
      );

      ReactDom.render(adaptableTopArea, this._topPlaceHolder.domElement);
    }
  }

  private _onDispose(): void{
    console.log(StringConstants.LogMessages.OnDisposeMethod);
  }  
}
