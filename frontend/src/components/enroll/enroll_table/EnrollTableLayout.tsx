import { EnrollCoursesTable } from "./EnrollCoursesTable";
import { EnrollSelectedTable } from "./EnrollSelectedTable";

export function EnrollTableLayout() {
    return <div 
    className="w-full gap-[10px]
    flex flex-col items-center">
        <EnrollCoursesTable/>
        <EnrollSelectedTable/>
    </div>
}