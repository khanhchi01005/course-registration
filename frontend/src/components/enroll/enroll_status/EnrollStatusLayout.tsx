import { EnrollStatusConfirm } from "./EnrollStatusConfirm";
import { EnrollStatusLogout } from "./EnrollStatusLogout";
import { EnrollStatusOnline } from "./EnrollStatusOnline";

export function EnrollStatusLayout() {
    return <div 
    className="relative w-full h-full">
        <EnrollStatusOnline/>
        <EnrollStatusConfirm/>
        <EnrollStatusLogout/>
    </div>
}