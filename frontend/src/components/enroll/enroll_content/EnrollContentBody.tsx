import { EnrollStatusLayout } from "../enroll_status/EnrollStatusLayout";
import { EnrollTableLayout } from "../enroll_table/EnrollTableLayout";
import { Footer } from "../../Footer";

export function EnrollContentBody() {
    return <div className="w-full h-full flex flex-col">
        <EnrollTableLayout />
        <EnrollStatusLayout />
        <Footer />
    </div>
}