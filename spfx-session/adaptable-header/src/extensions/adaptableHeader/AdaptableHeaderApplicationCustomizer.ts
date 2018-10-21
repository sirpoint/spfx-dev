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

const LOG_SOURCE: string = 'AdaptableHeaderApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAdaptableHeaderApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AdaptableHeaderApplicationCustomizer
  extends BaseApplicationCustomizer<IAdaptableHeaderApplicationCustomizerProperties> {
  private _topPlaceHolder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    // Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // let message: string = this.properties.testMessage;
    // if (!message) {
    //   message = '(No properties were provided.)';
    // }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    // pages-header-configuration

    this.context.placeholderProvider.changedEvent.add(this, this._renderTopPlaceHolder);
    this._renderTopPlaceHolder();

    return Promise.resolve<void>();
  }

  private async _renderTopPlaceHolder() {
    console.log("AdaptableHeaderApplicationCustomizer.__renderTopPlaceHolder()");
    console.log(
      "Available placeholders: ",
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
        Log.error('Init', new Error('The expected placeholder (Top) was not found'), this.context.serviceScope);
      }

      const adaptableTopArea: React.ReactElement<AdaptableTopAreaProps> = React.createElement(
        AdaptableTopArea,
        {
          title: '',
          globalNavigationItems: null,
          shortcutItems: null,
          pageHeaderConfig: null,
          currentUrl: this.context.pageContext.site.absoluteUrl,
        }
      );

      ReactDom.render(adaptableTopArea, this._topPlaceHolder.domElement);
    }
  }

  private _onDispose(): void{
    console.log('[AdaptableHeaderApplicationCustomizer._onDispose] Disposed custom top placeholder');
  }  
}
