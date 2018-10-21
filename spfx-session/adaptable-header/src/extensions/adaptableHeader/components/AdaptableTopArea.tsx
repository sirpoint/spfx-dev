import * as React from 'react';
import { AdaptableTopAreaProps } from './AdaptableTopAreaProps';
import { AdaptableTopAreaState } from './AdaptableTopAreaState';

export default class AdaptableTopArea extends React.Component<AdaptableTopAreaProps, AdaptableTopAreaState > {

    constructor(props: AdaptableTopAreaProps){
        super(props);
        
    }

    public render(): React.ReactElement<AdaptableTopAreaProps>{
        return(
            <div>
                <p>First test</p>
            </div>
        );
    }
}