import {
  Reporter, TestCase, TestError, TestResult, TestStep, 
} from '@playwright/test/reporter';
import Logger from './Logger';

const TEST_SEPARATOR = '----------------------------------------------------------';

export default class Listener implements Reporter {
  onTestBegin(test: TestCase, result: TestResult): void {
    this.printLogs(`Test: ${test.title} - Started`, TEST_SEPARATOR);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'failed') {
      Logger.error(`Test: ${test.title} - ${result.status}\n${result.error?.stack ?? 'No stack trace available'}`);
    }
    this.printLogs(`Test: ${test.title} - ${result.status}`, TEST_SEPARATOR);
  }
    
  onStdOut(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
    Logger.info(chunk.toString());
  }

  onStdErr(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
    Logger.error(chunk.toString());
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    Logger.info(`Step: ${step.title} - Started`);
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    Logger.info(`Step: ${step.title} - ${step.error ? 'Failed' : 'Completed'}`);
    if (step.error) {
      Logger.error(`Step error: ${step.error.message}`);
    }
  }

  onError(error: TestError): void {
    Logger.error(`Message: ${error.message}`);
    Logger.error(`Stack: ${error.stack}`);
    Logger.error(`Value: ${error.value}`);
  }
    
  private printLogs(msg: string, separator: string): void {
    Logger.info(separator);
    Logger.info(`${msg.toUpperCase()}`);
    Logger.info(separator);
  }
}
