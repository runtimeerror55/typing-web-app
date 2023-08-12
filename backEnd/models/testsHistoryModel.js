const mongoose = require("mongoose");

const testsHistorySchema = mongoose.Schema({
      tests: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "tests",
            },
      ],
      totalNumberOfTests: Number,
      averageAccuracy: Number,
      averageWpm: Number,
      totalNumberOfRightHits: Number,
      totalNumberOfWrongHits: Number,

      charactersStats: {
            " ": {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            a: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            b: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            c: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            d: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            e: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            f: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            g: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            h: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            i: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            j: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            k: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            k: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            l: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            m: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            n: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            o: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            p: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            q: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            r: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            s: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            t: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            u: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            v: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            w: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            x: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            y: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
            z: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  averageAccuracy: Number,
            },
      },
});

const testsHistoryModel = mongoose.model("testsHistories", testsHistorySchema);

module.exports = testsHistoryModel;
