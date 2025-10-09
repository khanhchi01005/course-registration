import { EnrollStatusLayout } from "../enroll_status/EnrollStatusLayout";
import { EnrollTableLayout } from "../enroll_table/EnrollTableLayout";

export function EnrollContentBody() {
    return <div className="w-full h-full flex flex-col">
        <EnrollTableLayout/>
        <EnrollStatusLayout/>
    </div>
}