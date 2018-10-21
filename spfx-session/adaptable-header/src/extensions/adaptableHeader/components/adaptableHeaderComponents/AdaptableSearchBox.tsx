import * as React from 'react';

import { AdaptableSearchBoxProps } from './CustomTopAreaComponentsProps';

export const AdaptableSearchBox = (props: AdaptableSearchBoxProps) =>
    <div>
        <h2>{props.title}</h2>
        <input title={props.toolptip} />
    </div>