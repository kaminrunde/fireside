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
        isActive?: (api: any) => boolean;
    };
};
export declare type SettingsPageRowEvent = {
    type: 'SETTINGS_PAGE_ROW';
    meta: {
        key: string;
    };
    payload: {
        title: string;
        component: any;
    };
};
export declare type CreatePageNavigationEvent = {
    type: 'CREATE_PAGE_NAVIGATION';
    meta: {
        key: string;
        slug: string;
    };
    payload: {
        icon?: any;
        label: any;
    };
};
export declare type CreatePagePageEvent = {
    type: 'CREATE_PAGE_PAGE';
    meta: {
        key: string;
        slug: string;
    };
    payload: {
        title: string;
        component: any;
    };
};
export declare type CreateStaticComponentEvent = {
    type: 'CREATE_STATIC_COMPONENT';
    meta: {
        key: string;
    };
    payload: {
        isActive?: (api: any) => boolean;
        component: any;
    };
};
