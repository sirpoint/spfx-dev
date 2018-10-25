import * as React from 'react';
import { GlobalNavigationProps } from './CustomTopAreaComponentsProps';
import styles from '../../common/AdaptableHeader.module.scss';
import { StringConstants } from '../../common/StringConstants';


export class GlobalNavigation extends React.Component<GlobalNavigationProps>{
   
    constructor(props: GlobalNavigationProps){
        super(props);
    }
    
    public render(){
        return(
            <div className={styles.divContainer}>
                <div className={styles.marginDiv}>
                    <span className= {`ms-Icon ms-Icon--Family ${styles.menuIcon}`} title="Family site"></span>
                </div>
                <ul className={styles.navigationBar}>
                    {this.props.globalNavigationItems.map((i)=>{
                        if(this.props.currentUrl === i.url){
                            return(
                                <li className={styles.navigationItemSelected}>
                                    <span>{i.name}</span>
                                </li>
                            );
                        }else{
                            return(
                                <li className={styles.navigationItem}>
                                    <a className={styles.navigationItem} href={i.url}>{i.name}</a>
                                </li>   
                            );
                        }
                    })}
                </ul>
            </div>        
        );
    }
    
}
