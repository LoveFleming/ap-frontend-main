declare module "simplebar-react" {
    import type { ForwardRefExoticComponent, RefAttributes } from "react";
    import type { Props as SimplebarProps } from "simplebar-react/dist/types";
    const SimpleBar: ForwardRefExoticComponent<SimplebarProps & RefAttributes<any>>;
    export default SimpleBar;
    export type { SimplebarProps as Props };
}