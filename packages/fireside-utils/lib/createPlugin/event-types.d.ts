export declare type InitialStateEvent = {
    type: 'INITIAL_STATE';
    payload: any;
};
export declare type ComponentBadgeEvent = {
    type: 'COMPONENT_BADGE';
    payload: {
        component: any;
        isActive: (api: any) => boolean;
    };
};
export declare type ComponentIconEvent = {
    type: 'COMPONENT_ICON';
    payload: {
        component: any;
        isActive: (api: any) => boolean;
        onClick: (api: any) => void;
    };
};
export declare type ComponentSettingsEvent = {
    type: 'COMPONENT_SETTINGS';
    payload: {
        title: string;
        component: any;
    };
};
export declare type PluginEvent = InitialStateEvent | ComponentBadgeEvent | ComponentIconEvent | ComponentSettingsEvent;
