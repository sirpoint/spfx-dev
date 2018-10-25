import * as React from 'react';
import { AdaptableTopAreaProps } from './AdaptableTopAreaProps';
import { AdaptableTopAreaState } from './AdaptableTopAreaState';
import { StringConstants } from '../common/StringConstants';
import { ComponentsToShow } from '../common/enums';
import { GlobalNavigation } from './adaptableHeaderComponents/GlobalNavigation';
import { Shortcuts } from '../../../../lib/extensions/adaptableHeader/components/adaptableHeaderComponents/Shortcuts';
import { AdaptableSearchBox } from '../../../../lib/extensions/adaptableHeader/components/adaptableHeaderComponents/AdaptableSearchBox';

export default class AdaptableTopArea extends React.Component<AdaptableTopAreaProps, AdaptableTopAreaState > {

    constructor(props: AdaptableTopAreaProps){
        super(props);   
    }

    public render(): React.ReactElement<AdaptableTopAreaProps>{
        return(
            <div>
                {this.props.pageHeaderConfig.styleInjection &&
                    <style >
                        {this.props.pageHeaderConfig.stylesToInject}
                    </style>
                }
                {this.props.title !== StringConstants.Empty &&
                    <h1>{this.props.title}</h1>
                }
                {this.props.pageHeaderConfig.componentsToShow.filter(componentName=> componentName === ComponentsToShow.GlobalNavigation).length > 0 &&
                    <GlobalNavigation title={StringConstants.ComponentTitles.GlobalNavigation} globalNavigationItems={this.props.globalNavigationItems} currentUrl={this.props.currentUrl} />            
                }
                {this.props.pageHeaderConfig.componentsToShow.filter(componentName=> componentName === ComponentsToShow.Shortcuts).length > 0 &&
                    <Shortcuts title={StringConstants.ComponentTitles.QuickLinks} quickLaunchItems={this.props.shortcutItems }/>                
                }
                {this.props.pageHeaderConfig.componentsToShow.filter(componentName=> componentName === ComponentsToShow.AdaptableSearchBox).length > 0 &&
                    <AdaptableSearchBox title={StringConstants.ComponentTitles.CustomSearchBox} toolptip="Search something you have in your sites" />
                }
            </div>
        );
    }
}