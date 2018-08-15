const assert = require('assert');
const SettingsBill = require('../settingsBill');

describe('settingsBill', function () {

 

  it('should be able to record calls', function () {
    const settingsBill = SettingsBill();
    settingsBill.timeStamps('call');
    assert.equal(1, settingsBill.filter('call').length);
  });

  it('should be able to record sms', function () {
    const settingsBill = SettingsBill();
    settingsBill.timeStamps('sms');
    assert.equal(1, settingsBill.filter('sms').length);
  });

  it('should be able to set the settings', function () {
    const settingsBill = SettingsBill();
    settingsBill.setSettings({
      smsCost: 2.35,
      callCost: 3.35,
      warningB: 30,
      criticalB: 40
    });

    assert.deepEqual({
      smsCost: 2.35,
      callCost: 3.35,
      warningB: 30,
      criticalB: 40
    }, settingsBill.costs())
  });

  it('should return the correct totals', function () {
    const settingsBill = SettingsBill();
    settingsBill.setCostCall(2.75);
    settingsBill.setCostSms(0.75);

    settingsBill.setCritical(10);
    settingsBill.setWarning(5);

    settingsBill.billSettings('call');
    settingsBill.billSettings('call');
    settingsBill.billSettings('sms');

    assert.equal(5.50, settingsBill.getCall());
    assert.equal(0.75, settingsBill.getSms());
    assert.equal(6.25, settingsBill.totalBills());
  });

  it('should not add more costs when critical level is reached', function (){
    const settingsBill = SettingsBill();
    settingsBill.setCostCall(3);
    settingsBill.setCostSms(0.75);

    settingsBill.setCritical(5);
    settingsBill.setWarning(10);

    settingsBill.billSettings('call');
    settingsBill.billSettings('call');
    settingsBill.billSettings('call');
    assert.equal(6, settingsBill.getCall());
    assert.equal(0, settingsBill.getSms());
    assert.equal(6, settingsBill.totalBills());
  });
});