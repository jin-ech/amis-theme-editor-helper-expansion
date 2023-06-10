declare type ResColor = {
    hex: string;
    hsv: number[];
}[];
export declare class ColorGenerator {
    color: string;
    reg: RegExp;
    constructor(color: string);
    /**
     * 生成衍生色
     */
    getDerivedColor(): {
        hex: string;
        hsv: number[];
    }[];
    /**
   * 生成亮色衍生色
   */
    getLightDerivedColor(): {
        hex: string;
        hsv: number[];
        rgb: number[];
    }[];
    /**
   * 生成深色衍生色
   */
    getDeepDerivedColor(): {
        hex: string;
        hsv: number[];
        rgb: number[];
    }[];
    /**
     * 生成中性色
     */
    getNeutralColor(): ResColor;
    /**
     * 生成功能色
     */
    getFunctionalColor(): {
        hex: string;
        hsv: number[];
    }[];
    /**
     * 生成数据色
     */
    getDataColor(): {
        rgb: number[];
        hsv: number[];
        gray: number;
        light: number;
        checkedRgb: number[];
        checkedColor: string;
        checkedGray: number;
        checkedLight: number;
    }[][];
    setPrimaryColor(color: string): void;
    static hexToRgb(hexColor: string): number[];
    static rgbToHex(rgb: number[]): string;
    static rgbToHsv(rgb: number[]): number[];
    static hsvToRgb(hsv: number[]): number[];
    static hsvCorrection(hsv: number[]): number[];
    static rgbCorrection(value: number): number;
    static functionY(x: number, coefficient: {
        a: number;
        b: number;
        c: number;
        d: number;
    }): number;
    static isLightColor(color: string): boolean;
    static getFontColor(color: string | undefined): "#fff" | "#5C5F66";
}
export { };
