import { EnrollContentBody } from "./EnrollContentBody";
import { EnrollContentVBar } from "./EnrollContentVBar";

export function EnrollContentLayout() {
    return <div
    className="w-screen h-full flex">
        <EnrollContentVBar/>
        <EnrollContentBody/>
    </div>
}