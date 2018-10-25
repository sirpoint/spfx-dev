import * as React from 'react';
import styles from '../../common/AdaptableHeader.module.scss';
import { StringConstants } from '../../common/StringConstants';

import { ShortcutsProps } from './CustomTopAreaComponentsProps';

export const Shortcuts = (props: ShortcutsProps) =>
    <div>
        <ul className={styles.navigationBar}>
            {props.quickLaunchItems.map((i)=>{
                return(                
                    <li className={styles.navigationItem}>
                        <a className={styles.navigationItem} href={i.url} target= {StringConstants.targets.blank}>{i.name}</a>
                    </li>   
                );
            })}
        </ul>
    </div>