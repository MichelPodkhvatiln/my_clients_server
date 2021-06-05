const moment = require('moment');
const db = require('../db');

const RecordModel = db.recordModel;

const getDateFilterValue = (days = 0) => {
  const today = moment().startOf('day');

  return {
    $gte: moment(today).subtract(days, 'days').utcOffset(0, true).toDate(),
    $lte: today.utcOffset(0, true).toDate(),
  };
};

const parseRecordsList = (recordsList) => {
  if (!Array.isArray(recordsList) || !recordsList.length) return [];

  return recordsList.reduce((accumulator, currentValue) => {
    const info = {
      date: currentValue.date,
      price: currentValue.serviceInfo.price,
    };

    if (!accumulator.length) {
      accumulator.push(info);
      return accumulator;
    }

    const currentDateRecordIdx = accumulator.findIndex((record) =>
      moment(record.date).isSame(info.date, 'day')
    );

    if (currentDateRecordIdx >= 0) {
      const updatedInfo = {
        ...accumulator[currentDateRecordIdx],
        price: accumulator[currentDateRecordIdx].price + info.price,
      };

      accumulator.splice(currentDateRecordIdx, 1, updatedInfo);
    } else {
      accumulator.push(info);
    }

    return accumulator;
  }, []);
};

exports.getRecordsWeekStats = (req, res) => {
  RecordModel.find({
    date: getDateFilterValue(7),
  })
    .sort({ date: 'asc' })
    .exec((err, recordsList) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!recordsList.length) {
        res.status(200).send({
          message: 'No data',
          data: [],
        });
        return;
      }

      res.status(200).send({
        message: 'Success',
        data: parseRecordsList(recordsList),
      });
    });
};

exports.getRecordsMonthStats = (req, res) => {
  const dayOnMonth = moment().daysInMonth();

  RecordModel.find({
    date: getDateFilterValue(dayOnMonth + 90), // TODO Remove!!!!
  })
    .sort({ date: 'asc' })
    .exec((err, recordsList) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!recordsList.length) {
        res.status(200).send({
          message: 'No data',
          data: [],
        });
        return;
      }

      res.status(200).send({
        message: 'Success',
        data: parseRecordsList(recordsList),
      });
    });
};
