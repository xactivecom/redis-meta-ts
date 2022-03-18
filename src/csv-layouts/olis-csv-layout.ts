/**
 * CSV column layout for OLIS test request nomenclature.
 * Corresponding Excel column letters shown for reference.
 */
export class OlisTestRequestColumns {
  requestCode: string; // A 1
  testRequestCode?: string;
  testSource?: string;
  requestName?: string; // D 4
  alternate1Name?: string; // E 5
  alternate2Name?: string; // F 6
  alternate3Name?: string; // G 7
  comments?: string; // H 8
  testRequestCategory?: string; // I 9
  testRequestSubCategory?: string; // J 10
  reportInd?: string;
  reportContext?: string;
  codeVersion?: string;
  effectiveDate?: string;
  endDate?: string;
  workflowStatusInd?: string;
  validationStatusInd?: string;
  registrationStatusInd?: string;
  changeNote?: string;
  documentText?: string;
  description?: string;
  anonymousTesting?: string;
  sortKey?: string; // W 23
  reportCategory?: string; // X 24

  // Used during CSV load to introspect header columns
  setNotEmpty() {
    this.requestCode = '';
    this.testRequestCode = '';
    this.testSource = '';
    this.requestName = '';
    this.alternate1Name = '';
    this.alternate2Name = '';
    this.alternate3Name = '';
    this.comments = '';
    this.testRequestCategory = '';
    this.testRequestSubCategory = '';
    this.reportInd = '';
    this.reportContext = '';
    this.codeVersion = '';
    this.effectiveDate = '';
    this.endDate = '';
    this.workflowStatusInd = '';
    this.validationStatusInd = '';
    this.registrationStatusInd = '';
    this.changeNote = '';
    this.documentText = '';
    this.description = '';
    this.anonymousTesting = '';
    this.sortKey = '';
    this.reportCategory = '';
  }
};

/**
 * CSV column layout for OLIS test result nomenclature.
 * Corresponding Excel column letters shown for reference.
 */
export class OlisTestResultColumns {
  loincCode: string; // A 1
  externCode?: string;
  externSource?: string;
  loincComponentName?: string;
  loincProperty?: string;
  units?: string;
  loincTime?: string;
  loincSystem?: string;
  loincScale?: string;
  loincMethod?: string;
  loincShortName?: string;
  loincName?: string; // L 12
  alternate1Name?: string; // M 13
  alternate2Name?: string; // N 14
  alternate3Name?: string; // O 15
  resultCategory?: string; // P 16
  resultSubCategory?: string; // Q 17
  loincAnswerList?: string;
  loincStatus?: string;
  liliCode?: string;
  reportable?: string;
  reportableContext?: string;
  externCodeVersion?: string;
  changeNote?: string;
  effectiveDate?: string;
  endDate?: string;
  workflowStatusInd?: string;
  validationStatusInd?: string;
  registrationStatusInd?: string;
  description?: string;
  sortKey?: string; // AE 31

  // Used during CSV load to introspect header columns
  setNotEmpty() {
    this.loincCode = '';
    this.externCode = '';
    this.externSource = '';
    this.loincComponentName = '';
    this.loincProperty = '';
    this.units = '';
    this.loincTime = '';
    this.loincSystem = '';
    this.loincScale = '';
    this.loincMethod = '';
    this.loincShortName = '';
    this.loincName = '';
    this.alternate1Name = '';
    this.alternate2Name = '';
    this.alternate3Name = '';
    this.resultCategory = '';
    this.resultSubCategory = '';
    this.loincAnswerList = '';
    this.loincStatus = '';
    this.liliCode = '';
    this.reportable = '';
    this.reportableContext = '';
    this.externCodeVersion = '';
    this.changeNote = '';
    this.effectiveDate = '';
    this.endDate = '';
    this.workflowStatusInd = '';
    this.validationStatusInd = '';
    this.registrationStatusInd = '';
    this.description = '';
    this.sortKey = '';
  }
};

/**
 * CSV column layout for OLIS test micro-organism nomenclature.
 * Corresponding Excel column letters shown for reference.
 */
export class OlisTestMicroColumns {
  microCode: string; // A 1
  microType?: string; // B 2
  taxonomicLevel?: string;
  microName?: string; // D 4
  alternate1Name?: string; // E 5
  alternate2Name?: string; // F 6
  microShortName?: string; // G 7
  source?: string;
  link?: string;
  reportable?: string;
  reportableContext?: string;
  effectiveStartDate?: string;
  effectiveEndDate?: string;
  changeNote?: string;
  comments?: string;
  workflowStatusInd?: string;
  validationStatusInd?: string;

  // Used during CSV load to introspect header columns
  setNotEmpty() {
    this.microCode = '';
    this.microType = '';
    this.taxonomicLevel = '';
    this.microName = '';
    this.alternate1Name = '';
    this.alternate2Name = '';
    this.microShortName = '';
    this.source = '';
    this.link = '';
    this.reportable = '';
    this.reportableContext = '';
    this.effectiveStartDate = '';
    this.effectiveEndDate = '';
    this.changeNote = '';
    this.comments = '';
    this.workflowStatusInd = '';
    this.validationStatusInd = '';
  }
};
