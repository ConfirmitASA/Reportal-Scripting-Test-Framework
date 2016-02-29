class TestTools { 
  
  static function SendErrorEmail(testDetails) {
    if(testDetails.Summary.FailedAsserts > 0) {
      var subject = "Errors in report: " + testDetails.Context.Report.Name; 
      var body = GetHtmlBody(testDetails.Context.Report, testDetails.Context.Component, testDetails.Summary);
      testDetails.Context.Confirmit.SendMail(Tests_Config.SenderEmailAddress, Tests_Config.RecipientEmailAddress, subject, body, "", "", 2, -1, body);
    }
  }
  
  static private function GetHtmlBody(report, text, summary) {
    var htmlBody = "Errors were found when running tests in report " + report.Name + ".<br><br>";
    htmlBody += "<b>" + summary.TotalAsserts + "</b> asserts were made. <b>" + summary.FailedAsserts + "</b> asserts failed.<br><br>";
    htmlBody += text.Output;
    return htmlBody;
  }
}