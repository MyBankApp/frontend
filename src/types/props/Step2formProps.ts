import type { Dispatch, SetStateAction } from "react";
import type { Step1formProps } from "./Step1formProps";

export interface Step2formProps extends Step1formProps {
    setStep: Dispatch<SetStateAction<number>>
}