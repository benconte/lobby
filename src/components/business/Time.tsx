import React from 'react'

function Time({ hours }: { hours: any }) {
    return (
        <div className="w-full">
            <h3 className="text-lg mb-2 font-bold text-[var(--lightblue)]">Open hours</h3>
            <div className="flex flex-col justify-start gap-2">
                <div className="flex items-center gap-8">
                    <span className="font-medium text-zinc-700 text-lg">Mon</span>
                    <span className=" text-[var(--dark)] text-lg">
                        {hours[0].open[1].is_overnight ? "open 24 hours" : (
                            <>
                                {hours[0].open[1].start} : {hours[0].open[1].start}
                            </>
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="font-medium text-zinc-700 text-lg">Tue</span>
                    <span className=" text-[var(--dark)] text-lg">
                        {hours[0].open[2].is_overnight ? "open 24 hours" : (
                            <>
                                {hours[0].open[2].start} : {hours[0].open[2].start}
                            </>
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="font-medium text-zinc-700 text-lg">Wed</span>
                    <span className=" text-[var(--dark)] text-lg">
                        {hours[0].open[3].is_overnight ? "open 24 hours" : (
                            <>
                                {hours[0].open[3].start} : {hours[0].open[3].start}
                            </>
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="font-medium text-zinc-700 text-lg">Thu</span>
                    <span className=" text-[var(--dark)] text-lg">
                        {hours[0].open[4].is_overnight ? "open 24 hours" : (
                            <>
                                {hours[0].open[4].start} : {hours[0].open[4].start}
                            </>
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="font-medium text-zinc-700 text-lg">Fri</span>
                    <span className=" text-[var(--dark)] text-lg">
                        {hours[0].open[5].is_overnight ? "open 24 hours" : (
                            <>
                                {hours[0].open[5].start} : {hours[0].open[5].start}
                            </>
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="font-medium text-zinc-700 text-lg">Sat</span>
                    <span className=" text-[var(--dark)] text-lg">
                        {hours[0].open[6].is_overnight ? "open 24 hours" : (
                            <>
                                {hours[0].open[6].start} : {hours[0].open[6].start}
                            </>
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="font-medium text-zinc-700 text-lg">Sun</span>
                    <span className=" text-[var(--dark)] text-lg">
                        {hours[0].open[0].is_overnight ? "open 24 hours" : (
                            <>
                                {hours[0].open[0].start} : {hours[0].open[0].start}
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Time