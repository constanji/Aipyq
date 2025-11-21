import { SettingsConfiguration } from './generate';
export declare const librechat: {
    modelLabel: {
        readonly key: "modelLabel";
        readonly label: "com_endpoint_custom_name";
        readonly labelCode: true;
        readonly type: "string";
        readonly default: "";
        readonly component: "input";
        readonly placeholder: "com_endpoint_openai_custom_name_placeholder";
        readonly placeholderCode: true;
        readonly optionType: "conversation";
    };
    maxContextTokens: {
        readonly key: "maxContextTokens";
        readonly label: "com_endpoint_context_tokens";
        readonly labelCode: true;
        readonly type: "number";
        readonly component: "input";
        readonly placeholder: "com_nav_theme_system";
        readonly placeholderCode: true;
        readonly description: "com_endpoint_context_info";
        readonly descriptionCode: true;
        readonly optionType: "model";
        readonly columnSpan: 2;
    };
    resendFiles: {
        readonly key: "resendFiles";
        readonly label: "com_endpoint_plug_resend_files";
        readonly labelCode: true;
        readonly description: "com_endpoint_openai_resend_files";
        readonly descriptionCode: true;
        readonly type: "boolean";
        readonly default: true;
        readonly component: "switch";
        readonly optionType: "conversation";
        readonly showDefault: false;
        readonly columnSpan: 2;
    };
    promptPrefix: {
        readonly key: "promptPrefix";
        readonly label: "com_endpoint_prompt_prefix";
        readonly labelCode: true;
        readonly type: "string";
        readonly default: "";
        readonly component: "textarea";
        readonly placeholder: "com_endpoint_openai_prompt_prefix_placeholder";
        readonly placeholderCode: true;
        readonly optionType: "model";
    };
    fileTokenLimit: {
        readonly key: "fileTokenLimit";
        readonly label: "com_ui_file_token_limit";
        readonly labelCode: true;
        readonly description: "com_ui_file_token_limit_desc";
        readonly descriptionCode: true;
        readonly placeholder: "com_nav_theme_system";
        readonly placeholderCode: true;
        readonly type: "number";
        readonly component: "input";
        readonly columnSpan: 2;
    };
};
export declare const paramSettings: Record<string, SettingsConfiguration | undefined>;
export declare const presetSettings: Record<string, {
    col1: SettingsConfiguration;
    col2: SettingsConfiguration;
} | undefined>;
export declare const agentParamSettings: Record<string, SettingsConfiguration | undefined>;
