class Assert {   
  static function AreEqual(expected, actual, testDetails, message) {
	var testIdentifier = CreateTestIdentifier(message);
	var result = AreEqualCheck(testIdentifier, expected, actual);
    if(result.success == false) {
      testDetails.Summary.FailedAsserts += 1;
    }
    testDetails.Summary.TotalAsserts += 1;
    LogTest(result, testDetails.Context.Component, testDetails.Context.Log);
	return [result];
  }
  
  private static function CreateTestIdentifier(message) {
    var caller = new System.Diagnostics.StackFrame(2).GetMethod().Name;
	var testIdentifier = caller + " : ";
	if(message != null) {
	  testIdentifier += message + " : ";
	}
    return testIdentifier;
  }
  
  private static function AreEqualCheck(testIdentifier, expected, actual) {
    if(expected === actual) {
      return AssertIsTrue(testIdentifier);
    }
    else {
      return AssertIsFalse(testIdentifier, expected, actual);
    }
  }
  
  private static function AssertIsTrue(testIdentifier) {
    var result = {};
	var htmlMmessage = CreateHtmlSuccessMessage(testIdentifier);
	var plainTextMmessage = CreatePlainTextSuccessMessage(testIdentifier);
    result.success = true;
    result.htmlMessage = htmlMmessage;
	result.plainTextMessage = plainTextMmessage;
    return result;
  }
  
  private static function AssertIsFalse(testIdentifier, expected, actual) {
    var result = {};
	var htmlMessage = CreateHtmlFailedMessage(testIdentifier, expected, actual);
	var plainTextMmessage = CreatePlainTextFailedMessage(testIdentifier, expected, actual);
	result.success = false;
	result.htmlMessage = htmlMessage;
	result.plainTextMessage = plainTextMmessage;
    return result;
  }
  
  private static function CreateHtmlSuccessMessage(testIdentifier) {
    return testIdentifier + "<span style='color:#009100;font-weight:bold'>Success</span><br>";
  }
  
  private static function CreateHtmlFailedMessage(testIdentifier, expected, actual) {
    var htmlMessage = testIdentifier + "<span style='color:#ff0000;font-weight:bold'>Failed</span><br>";
    htmlMessage += "Expected: " + expected + "<br>";
    htmlMessage += "Actual: " + actual+ "<br>";
    return htmlMessage;
  }
  
  private static function CreatePlainTextSuccessMessage(testIdentifier) {
    return testIdentifier + "Success";
  }
  
  private static function CreatePlainTextFailedMessage(testIdentifier, expected, actual) {
    var plainTextMmessage = testIdentifier + "Failed\n";
    plainTextMmessage += "Expected: " + expected + "\n";
    plainTextMmessage += "Actual: " + actual + "\n";
    return plainTextMmessage;
  }
  
  private static function LogTest(result, text, log) {
    if(Tests_Config.WriteToText) {
	  text.Output.Append(result.htmlMessage);
    }
	if(Tests_Config.WriteToLog) {
	  log.LogDebug(result.plainTextMessage);
	}
  }
}