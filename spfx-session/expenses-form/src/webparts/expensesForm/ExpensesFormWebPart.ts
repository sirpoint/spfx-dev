import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ExpensesFormWebPartStrings';
import ExpensesForm from './components/ExpensesForm';
import { IExpensesFormProps } from './components/IExpensesFormProps';

export interface IExpensesFormWebPartProps {
  description: string;
}

export default class ExpensesFormWebPart extends BaseClientSideWebPart<IExpensesFormWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IExpensesFormProps > = React.createElement(
      ExpensesForm,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
