export declare function getPropsFromChild(child: any): any;
export declare function getChildFromComponent(component: any): any;
export declare function getDataFromTree(app: any, ctx?: any, fetch?: boolean): Promise<any>;
export declare function renderToStringWithData(component: any): Promise<{
    markup: string;
    initialState: any;
}>;
