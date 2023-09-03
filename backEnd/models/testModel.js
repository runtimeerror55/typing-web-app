const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
      accuracy: Number,
      wpm: Number,
      totalNumberOfRightHits: Number,
      totalNumberOfWrongHits: Number,
      charactersStats: {
            " ": {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            a: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            b: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            c: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            d: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            e: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            f: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            g: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            h: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            i: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            j: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            k: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            k: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            l: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            m: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            n: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            o: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            p: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            q: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            r: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            s: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            t: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            u: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            v: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            w: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            x: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            y: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
            z: {
                  totalNumberOfRightHits: Number,
                  totalNumberOfWrongHits: Number,
                  accuracy: Number,
            },
      },
});

const testModel = mongoose.model("tests", testSchema);

module.exports = testModel;
