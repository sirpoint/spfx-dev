import * as React from 'react';
import { GlobalNavigationProps } from './CustomTopAreaComponentsProps';
import styles from '../../common/AdaptableHeader.module.scss';
import { StringConstants } from '../../common/StringConstants';


export class GlobalNavigation extends React.Component<GlobalNavigationProps>{
   
    constructor(props: GlobalNavigationProps){
        super(props);
    }
    
    private onIconSuiteBar = (event: any): any => {
        let suiteBar = document.getElementById("hideSuiteBar");
        let iconHideShowSuiteBar = document.getElementById("showHideSuiteBar");
        if (suiteBar){
            if (suiteBar.innerHTML === ""){
                suiteBar.innerHTML = StringConstants.Styles.HideSuiteBar;
                iconHideShowSuiteBar.setAttribute("class",`ms-Icon ms-Icon--RedEye x-hidden-focus ${styles.toolBarItem}`);
                iconHideShowSuiteBar.title = "Show Office 365 Bar";
            }else{
                suiteBar.innerHTML = StringConstants.Empty;
                iconHideShowSuiteBar.setAttribute("class",`ms-Icon ms-Icon--Hide x-hidden-focus ${styles.toolBarItem}`);
                iconHideShowSuiteBar.title = "Hide Office 365 Bar";
            }
        }
    }

    public render(){
        return(
            <div className={styles.divContainer}>
                <div className={styles.marginDiv}>
                    &#9776;
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
                <ul className={styles.toolBar}>
                    <li className={styles.toolBarItem}>
                        <a className={`ms-Icon ms-Icon--RedEye x-hidden-focus ${styles.toolBarItem}`}
                        onClick ={this.onIconSuiteBar}
                        title = "Show Office 365 Bar"
                        id="showHideSuiteBar"
                        ></a>
                    </li>
                </ul>
            </div>        
        );
    }
    
}
