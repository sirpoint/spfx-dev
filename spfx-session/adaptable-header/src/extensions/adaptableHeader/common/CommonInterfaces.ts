export interface NavigationItem{
    name: string;
    url: string;
    description:string;
    target: string;
}

export interface PageHeaderConfig{
    pageName:string;
    componentsToShow: string[];
    styleInjection: boolean;
    stylesToInject:string;
}