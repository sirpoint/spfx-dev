import { NavigationItem } from "../../common/CommonInterfaces";

export interface GlobalNavigationProps{
    title:string;
    globalNavigationItems:NavigationItem[];
    currentUrl: string;
}

export interface ShortcutsProps {
    title:string;
    quickLaunchItems: NavigationItem[];
}

export interface AdaptableSearchBoxProps{
    title:string;
    toolptip: string;
}