class TestTools { 
  
  static function SendErrorEmail(testDetails) {
    if(testDetails.Summary.FailedAsserts > 0) {
      var subject = "Errors in report: " + testDetails.Context.Report.Name; 
      var body = GetHtmlBody(testDetails.Context.Report, testDetails.Context.Component, testDetails.Summary);
      testDetails.Context.Confirmit.SendMail(TestConfig.SenderEmailAddress, TestConfig.RecipientEmailAddress, subject, body, "", "", 2, -1, body);
    }
  }
  
  static function GetHtmlBody(report, text, summary) {
    var htmlBody = "Errors were found when running tests in report " + report.Name + ".<br><br>";
    htmlBody += "<b>" + summary.TotalAsserts + "</b> asserts were made. <b>" + summary.FailedAsserts + "</b> asserts failed.<br><br>";
    htmlBody += text.Output;
    return htmlBody;
  }
  
  static function SendErrorEmail_old(confirmit, report, results, log) {
    var testResults = new TestResults(report, results);
    var plainTextBody = testResults.GetPlaintextBody();
    var htmlBody = testResults.GetHtmlBody();
    confirmit.SendMail(TestConfig.SenderEmailAddress, TestConfig.RecipientEmailAddress, "Errors in report: " + report.Name, plainTextBody, "", "", 2, -1, htmlBody);
  }
}

class TestResults {
  var TotalNumberOfAsserts;
  private var _plaintextErrors = [];
  private var _htmlErrors = [];
  private var _report;
  private var _log;
  
  function TestResults(report, testResults, log) {
    TotalNumberOfAsserts = testResults.length;
    _report = report;
    _log = log;
    for(var i = 0; i < testResults.length; ++i) {
      var testResult = testResults[i];
      if(testResult != null && !testResult.success) {
        _plaintextErrors.push(testResult.plainTextMessage);
        _htmlErrors.push(testResult.htmlMessage);
      }
    }
  }
   
  function GetHtmlBody() {
    /*var htmlBody = "Errors were found when running tests in report " + _report.Name + ".<br><br>";
    htmlBody += "<b>" + summary.TotalAsserts + "</b> asserts were made. <b>" + summary.FailedAsserts + "</b> asserts failed.<br><br>";
    htmlBody += _htmlErrors.join("<br><br>");
    return htmlBody;*/
  }
  
  function GetPlaintextBody() {
    /*var htmlBody = "Errors were found when running tests in report " + _report.Name + ".<br><br>";
    htmlBody += "<b>" + summary.TotalAsserts + "</b> asserts were made. <b>" + summary.FailedAsserts + "</b> asserts failed.<br><br>";
    htmlBody += _htmlErrors.join("<br><br>");
    return htmlBody;*/
  }
}