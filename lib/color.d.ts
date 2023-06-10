declare function computedLight(R: number, G: number, B: number): {
    gray: number;
    light: number;
};
declare const getColorPalette: (color: string, vv?: number) => {
    rgb: number[];
    hsv: number[];
    gray: number;
    light: number;
    checkedRgb: number[];
    checkedColor: string;
    checkedGray: number;
    checkedLight: number;
}[];
export { getColorPalette, computedLight };
