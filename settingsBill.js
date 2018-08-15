  const moment = require('moment');
  module.exports = function SettingsBill() {
    let callB = 0;
    let smsB = 0;
    let totalB = 0;
    let stampMap = [];

    let callCost = 2.75;
    let smsCost = 0.75;
    let warningB = 20;
    let criticalB = 40;

    function billSettings(billType) {
      //if (totalBills() < criticalB) {
      if (billType === 'call') {
        if (totalB < criticalB) {
          callB += callCost;
          totalB += callCost;
        }
      }
      if (billType === 'sms') {
        if (totalB < criticalB) {
          smsB += smsCost;
          totalB += smsCost;
        }
      }
      //}
      //totalB = callB + smsB;
    }

    function timeStamps(value) {
      let myDate = new Date();
      let timeAgo = moment(myDate);
      if (value === 'call') {
        stampMap.push({
          type: value,
          price: getCallCost(),
          when: myDate,
          ago: timeAgo
        });
      } else if (value === 'sms') {
        stampMap.push({
          type: value,
          price: getSmsCost(),
          when: myDate,
          ago: timeAgo
        });
      }
    }

    //filtering
    function filter(value) {
      var tempList = [];
      for (var i = 0; i < stampMap.length; i++) {
        if (stampMap[i].type === value) {
          tempList.push(stampMap[i]);
        }
      }
      return tempList;
    }

    function getStamps() {
      return stampMap;
    }

    //all totals
    function getCall() {
      return callB;
    }

    function getSms() {
      return smsB;
    }

    function totalBills() {
      return totalB = callB + smsB;
    }

    //setting totals
    function getCallCost() {
      return callCost;
    }

    function getSmsCost() {
      return smsCost;
    }

    function getCritical() {
      return criticalB;
    }

    function getWarning() {
      return warningB;
    }

    function setCall(value) {
      callB = value;
    }

    function setSms(value) {
      smsB = value;
    }

    function clearTimeStamp() {
      stampMap = [];
    }


    function costs() {
      return {
        callCost,
        smsCost,
        warningB,
        criticalB
      }
    }

    function setSettings (settings) {
      smsCost = Number(settings.smsCost);
      callCost = Number(settings.callCost);
      warningB = settings.warningB;
      criticalB = settings.criticalB;
  }

    //setters
    function setCostCall(value) {
      callCost = value;
    }

    function setCostSms(value) {
      smsCost = value;
    }

    function setWarning(value) {
      warningB = value;
    }

    function setCritical(value) {
      criticalB = value;
    }

    return {
      totalBills,
      billSettings,
      setCostCall,
      setCostSms,
      setCritical,
      setWarning,
      getCall,
      getSms,
      getWarning,
      getCritical,
      costs,
      getCallCost,
      getSmsCost,
      getStamps,
      timeStamps,
      filter,
      setSettings,
      setSms,
      setCall,
      clearTimeStamp
    }
  }