export declare type InitialStateEvent = {
    type: 'INITIAL_STATE';
    meta: {
        key: string;
    };
    payload: any;
};
export declare type ComponentBadgeEvent = {
    type: 'COMPONENT_BADGE';
    meta: {
        key: string;
    };
    payload: {
        component: any;
        isActive: (api: any) => boolean;
    };
};
export declare type GridRowBadgeEvent = {
    type: 'GRID_ROW_BADGE';
    meta: {
        key: string;
    };
    payload: {
        component: any;
        isActive: (api: any) => boolean;
    };
};
export declare type ComponentIconEvent = {
    type: 'COMPONENT_ICON';
    meta: {
        key: string;
    };
    payload: {
        component: any;
        isActive: (api: any) => boolean;
        onClick: (api: any) => void;
    };
};
export declare type GridRowIconEvent = {
    type: 'GRID_ROW_ICON';
    meta: {
        key: string;
    };
    payload: {
        component: any;
        isActive: (api: any) => boolean;
        onClick: (api: any) => void;
    };
};
export declare type ComponentSettingsEvent = {
    type: 'COMPONENT_SETTINGS';
    meta: {
        key: string;
    };
    payload: {
        title: string;
        component: any;
    };
};
export declare type GridRowSettingsEvent = {
    type: 'GRID_ROW_SETTINGS';
    meta: {
        key: string;
    };
    payload: {
        title: string;
        component: any;
    };
};
