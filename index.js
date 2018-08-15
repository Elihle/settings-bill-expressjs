const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settingsBill');
const moment = require('moment');

const app = express();
const factory = SettingsBill();

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {'ago' : function(){
    return moment(this.ago).fromNow();
  }}
}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  //setting totals
  let call = factory.getCallCost();
  let sms = factory.getSmsCost();
  let warning = factory.getWarning();
  let critical = factory.getCritical();

  //getting totals
  let callsTotal = factory.getCall();
  let smsTotal = factory.getSms();
  let totals = factory.totalBills();

  let colour;
  if (totals >= critical){
    colour = "danger";
  }
  else if (totals >= warning){
    colour = "warning";
  }

  res.render('home', {colour,call,sms,warning,critical,callsTotal,smsTotal,totals});
});

app.post('/settings', function (req, res) {
  let call = parseFloat(req.body.callCost);
  let sms = parseFloat(req.body.smsCost);
  let warning = parseFloat(req.body.warningLevel);
  let critical = parseFloat(req.body.criticalLevel);

  factory.setCostCall(call);
  factory.setCostSms(sms);
  factory.setWarning(warning);
  factory.setCritical(critical);

  res.redirect('/');
});

app.post('/action', function (req, res) {
  var radio = req.body.actionType;
  factory.billSettings(radio);
  factory.timeStamps(radio);
  console.log(radio);

  res.redirect('/');
});

app.get('/actions', function (req, res) {
  res.render('actions', {stampMap: factory.getStamps()});
});

app.get('/actions/:type', function (req, res) {
  let entered = req.params.type;
  console.log(entered);
  res.render('actions', {stampMap : factory.filter(entered)});
});

app.post('/reset', function (req, res) {
  factory.setCall(0);
  factory.setSms(0);
  factory.clearTimeStamp();
  res.redirect('/');
});

app.post('/back', function (req, res) {
  res.redirect('/');
});



let PORT = process.env.PORT || 3009;
app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});