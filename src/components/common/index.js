import Vue from 'vue'
import SnackBar from "./SnackBar";
import Divider from "./Divider.vue";
import ExpansionPanel from "./ExpansionPanel";
import DialogConfirm from "./DialogConfirm";

import InfoText from "./InfoText";

import ButtonConfirm from "./Buttons/ButtonConfirm";
import ButtonCancel from "./Buttons/ButtonCancel";
import ButtonIconDetail from "./Buttons/ButtonIconDetail";
import ButtonClipboard from "./Buttons/ButtonClipboard";

import AnimacionBottomToTop from "./Animations/AnimacionBottomToTop";
import AnimacionTopToBottom from "./Animations/AnimacionTopToBottom";

import InputCurrency from "./Inputs/InputCurrency";
import InputDateBasic from "./Inputs/InputDateBasic";
import InputDateDynamic from "./Inputs/InputDateDynamic";
import InputDateRange from "./Inputs/InputDateRange";
import InputFile from "./Inputs/InputFile";
import InputNumber from "./Inputs/InputNumber";
import InputSearch from "./Inputs/InputSearch";

import SelectEstadosCiviles from "./Inputs/Selects/SelectEstadosCiviles";

import ChipTextContrast from "./ChipTextContrast";
import ImageIcon from "./ImageIcon";

const componentsList = [
    Vue.component("CDivider", Divider),
    Vue.component("CSnackBar", SnackBar),

    Vue.component("CButtonConfirm", ButtonConfirm),
    Vue.component("CButtonCancel", ButtonCancel),
    Vue.component("CButtonIconDetail", ButtonIconDetail),
    Vue.component("CButtonClipboard", ButtonClipboard),

    Vue.component("CExpansionPanel", ExpansionPanel),
    Vue.component("CDialogConfirm", DialogConfirm),

    Vue.component("CAnimacionBottomToTop", AnimacionBottomToTop),
    Vue.component("CAnimacionTopToBottom", AnimacionTopToBottom),

    Vue.component("CInfoText", InfoText),

    Vue.component("CInputCurrency", InputCurrency),
    Vue.component("CInputDateBasic", InputDateBasic),
    Vue.component("CInputDateDynamic", InputDateDynamic),
    Vue.component("CInputDateRange", InputDateRange),
    Vue.component("CInputFile", InputFile),
    Vue.component("CInputNumber", InputNumber),
    Vue.component("CInputSearch", InputSearch),

    Vue.component("SelectEstadosCiviles", SelectEstadosCiviles),

    Vue.component("ChipTextContrast", ChipTextContrast),
    Vue.component("ImageIcon", ImageIcon),
]

export const commonComponents = {
    componentsList
}