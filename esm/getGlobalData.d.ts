import { ThemeDefinition } from './declares';
interface Options {
    label: string;
    value: string;
    realValue?: any;
    children?: Options[];
}
export interface GlobalData {
    colorOptions?: Options[];
    fontFamilyOptions?: Options[];
    fontSizeOptions?: Options[];
    lineHeightOptions?: Options[];
    fontWeightOptions?: Options[];
    borderRadiusOptions?: Options[];
    borderWidthOptions?: Options[];
    borderStyleOptions?: Options[];
    sizesOptions?: Options[];
    shadowOptions?: Options[];
}
export declare function getGlobalData(data: ThemeDefinition | undefined): GlobalData;
export {};
