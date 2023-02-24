import { useState, useContext } from "react"
import DoneIcon from '@mui/icons-material/Done';
import { BookContext } from "@/context/BookingContext"

function Tabs() {
    const { tabIndex, setTabIndex } = useContext(BookContext)
    return (
        <div className="w-full h-auto flex items-center py-2 justify-center gap-2">
            <div className={`flex items-center gap-2 cursor-pointer after:w-16 after:h-[2px] after:border ${tabIndex >= 1 ? "after:border-solid after:border-[var(--green)]" : "after:border-dashed after:border-gray-400"} after:mx-1`} onClick={() => setTabIndex(1)}>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-lg text-sm text-gray-500 ${tabIndex >= 1 && "bg-[var(--green)] text-white"} m-0`}>
                    {tabIndex >= 1 ? (
                        <DoneIcon className="text-lg text-white" />
                    ) : <span>1</span>
                    }
                </span>
                <p className={`text-base font-medium ${tabIndex >= 1 && "text-[var(--green)]"}`}>Dates & Rooms</p>
            </div>
            {/* <div className={`flex items-center gap-2 cursor-pointer after:w-16 after:h-[2px] after:border ${tabIndex >= 2 ? "after:border-solid after:border-[var(--green)]" : "after:border-dashed after:border-gray-400"} after:mx-1`} onClick={() => setTabIndex(2)}>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-lg text-sm text-gray-500 ${tabIndex >= 2 && "bg-[var(--green)] text-white"} m-0`}>
                    {tabIndex >= 2 ? (
                        <DoneIcon className="text-lg text-white" />
                    ) : <span>2</span>
                    }
                </span>
                <p className={`text-base font-medium text-gray-400 ${tabIndex >= 2 && "text-[var(--green)]"}`}>Payment</p>
            </div> */}
            <div className={`flex items-center gap-2 cursor-pointer`} onClick={() => setTabIndex(2)}>
                <span className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-lg text-sm text-gray-500 ${tabIndex == 3 && "bg-[var(--green)] text-white"} m-0`}>
                    {tabIndex >= 2 ? (
                        <DoneIcon className="text-lg text-white" />
                    ) : <span>2</span>
                    }
                </span>
                <p className={`text-base font-medium text-gray-400 ${tabIndex == 3 && "text-[var(--green)]"}`}>Confirmation</p>
            </div>
        </div>
    )
}

export default Tabs