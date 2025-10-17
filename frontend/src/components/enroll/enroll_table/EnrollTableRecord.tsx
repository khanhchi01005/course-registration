import { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import type { RecordAttribute, RecordData } from "../../../datatypes/EnrollDataType";
import { CoursesContext } from "../EnrollExtra";

export function EnrollTableRecords({
    courseData,
    index,
    recordKey,
    isCourseTable = true,
}: RecordData & { index: number; recordKey: string; isCourseTable?: boolean }) {
    const { records, setRecords } = useContext(CoursesContext);
    const record = records[recordKey];
    const isSelected = record?.isSelect;
    const isFull = courseData.currentSlots >= courseData.maxSlots;

    const handleUnselect = () => {
        // 🧩 Khi ấn thùng rác → tắt checkbox (isSelect = false)
        setRecords((prev) => ({
            ...prev,
            [recordKey]: {
                ...prev[recordKey],
                isSelect: false,
            },
        }));
    };

    return (
        <div
            className={`w-full min-h-[2.5rem] flex justify-between
            ${isFull
                    ? "bg-gray-200"
                    : isSelected
                        ? "bg-yellow-200"
                        : "bg-white"
                }`}
        >
            <Record name={(index + 1).toString()} width="basis-1/24" pos="other" isCheckBox={false} keyCode={recordKey} isFull={isFull} />
            <Record name={courseData.courseName} width="basis-4/12" pos="other" isCheckBox={false} keyCode={recordKey} isFull={isFull} />
            <Record name={courseData.courseCode} width="basis-3/12" pos="other" isCheckBox={false} keyCode={recordKey} isFull={isFull} />
            <Record name={courseData.maxSlots.toString()} width="basis-2/12" pos="other" isCheckBox={false} keyCode={recordKey} isFull={isFull} isCapacityField />
            <Record name={courseData.currentSlots.toString()} width="basis-2/12" pos="other" isCheckBox={false} keyCode={recordKey} isFull={isFull} isCapacityField />

            {/* ✅ Cuối bảng */}
            {isCourseTable ? (
                <Record
                    name={"Đăng kí"}
                    width="basis-1/12"
                    pos="right"
                    isCheckBox={true}
                    keyCode={recordKey}
                    isFull={isFull}
                />
            ) : (
                <div
                    className="basis-1/12 border-b-[1px] border-gray-300 flex items-center justify-start pl-[12px] cursor-pointer"
                    onClick={handleUnselect}
                >
                    <Trash2 size={16} className="text-red-500 hover:text-red-700" />
                </div>
            )}
        </div>
    );
}

function Record({
    name,
    width,
    pos,
    isCheckBox,
    keyCode,
    isFull = false,
    isCapacityField = false,
}: RecordAttribute & { isFull?: boolean; isCapacityField?: boolean }) {
    const { records, setRecords } = useContext(CoursesContext);
    const [openCheckBox, setOpenCheckBox] = useState<boolean>(false);
    const record: RecordData = records[keyCode];

    const borderType: Record<string, string> = {
        right: "",
        other: "border-r-[1px]",
    };

    const changeStatusRecord = () => {
        setRecords((prev) => ({
            ...prev,
            [keyCode]: {
                ...prev[keyCode],
                isSelect: !prev[keyCode].isSelect,
            },
        }));
    };

    useEffect(() => {
        if (record?.courseData)
            setOpenCheckBox(!(record.courseData.currentSlots >= record.courseData.maxSlots));
    }, [record]);

    const textColor = isFull
        ? isCapacityField
            ? "text-gray-600 font-semibold"
            : "text-gray-500"
        : "text-black";

    return (
        <div
            className={`h-full ${width} border-b-[1px] ${borderType[pos]} border-gray-300 flex items-center`}
        >
            {isCheckBox ? (
                openCheckBox && (
                    <input
                        type="checkbox"
                        checked={record?.isSelect || false}
                        onChange={changeStatusRecord}
                        className="size-[0.8rem] ml-[1rem] accent-blue-500 cursor-pointer"
                    />
                )
            ) : (
                <h1 className={`text-[0.9rem] yrsa-font ml-[8px] ${textColor}`}>{name}</h1>
            )}
        </div>
    );
}
