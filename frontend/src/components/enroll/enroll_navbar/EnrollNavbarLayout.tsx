import { EnrollNavBarHeader } from "./EnrollNavbarHeader";
import { EnrollNavBarInfo } from "./EnrollNavbarInfo";

export function EnrollNavbarLayout() {
    return <nav
    className="w-screen h-[76px] z-10
    shadow-[0_0_10px_rgba(0,0,0,0.2)]
    flex items-center justify-between"
    >
        <EnrollNavBarHeader/>
        <EnrollNavBarInfo/>
    </nav>
}