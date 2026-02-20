import Bree from "bree";
import Cabin from "cabin"
import path from "path";



const bree = new Bree({
    logger: new Cabin(),
    root:path.resolve("dist/jobs/workers"),
    jobs: [
        {
            name: "generateAnalyticsDataWorker",
            worker: {
                workerData: {
                    timeScoop: "day"
                }
            }
        }
    ]
})

bree.start();