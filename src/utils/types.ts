import { PropsWithChildren } from "react";


export type StyledProps = PropsWithChildren & {
    className?: string;
}

export type ButtonProps = PropsWithChildren & {
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement> 
}