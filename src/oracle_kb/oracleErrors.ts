import { OracleErrorDetail } from '../types/ifs.js';

export const ORACLE_ERROR_KNOWLEDGE_BASE: Record<string, OracleErrorDetail> = {
  'ORA-04063': {
    errorCode: 'ORA-04063',
    title: 'View or Package Has Errors',
    standardCause: 'An attempt was made to execute a stored procedure or use a view that has compilation errors.',
    ifsSpecificCause: 'In IFS Cloud Developer Studio / Aurena architecture, an underlying view (*.views) or package body (*.apy) failed compilation due to missing grant, altered table structure, invalid Marble entity column reference, or missing custom field attributes.',
    remediationSteps: [
      'Locate the failing package or view in Developer Studio output log.',
      'Check if the corresponding *.entity or *.views has invalid SQL expressions.',
      'Re-deploy the target package header (*.api) and body (*.apy) using Developer Studio Deploy or SQL command.',
      'Run `ALTER PACKAGE <package_name> COMPILE BODY;` or `SHOW ERRORS PACKAGE BODY <package_name>;` in SQL Developer / PL/SQL Developer.',
      'Ensure Dictionary_SYS.Rebuild_Dictionary_() is executed if runtime metadata is stale.'
    ],
    exampleStacktrace: 'ORA-04063: view "IFSAPP.CUSTOMER_ORDER_JOIN" has errors'
  },
  'ORA-00942': {
    errorCode: 'ORA-00942',
    title: 'Table or View Does Not Exist',
    standardCause: 'The specified table or view does not exist or the user lacks permission to access it.',
    ifsSpecificCause: 'An IFS Projection or PL/SQL view references a table/view from another component that has not been deployed, or the IAL / custom field view lacks object grants to IFSSYS/IFSAPP user.',
    remediationSteps: [
      'Verify table name spelling and prefix in Marble *.entity or *.views.',
      'Ensure component static storage file (*.storage) has created the table.',
      'Verify table grant: `GRANT SELECT ON <table_name> TO IFSSYS;`',
      'Check if component dependency is declared in module.cre or database deploy sequence.'
    ],
    exampleStacktrace: 'ORA-00942: table or view does not exist'
  },
  'PLS-00103': {
    errorCode: 'PLS-00103',
    title: 'Encountered Symbol / Syntax Error in PL/SQL',
    standardCause: 'The PL/SQL parser found a token it was not expecting.',
    ifsSpecificCause: 'Syntax error inside custom logic PL/SQL file (*.apy or *.plsql). Common causes include missing semicolon `;`, mismatched `BEGIN...END;`, missing `@Override` / `@UncheckedAccess` annotation syntax, or unmatched quotes in `Error_SYS.Record_General`.',
    remediationSteps: [
      'Check line and column offset in PL/SQL file.',
      'Ensure IFS code annotations like `--  @UncheckedAccess` or `--  @ServerOnlyAccess` are formatted with exactly two trailing spaces.',
      'Check `Error_SYS.Record_General(lu_name_, \'ERRMSG: Message text...\')` syntax for mismatched single quotes.'
    ],
    exampleStacktrace: 'PLS-00103: Encountered the symbol "END" when expecting one of the following...'
  },
  'ORA-00001': {
    errorCode: 'ORA-00001',
    title: 'Unique Constraint Violated',
    standardCause: 'An update or insert attempted to create a duplicate key in a unique constraint column.',
    ifsSpecificCause: 'Primary key conflict in an IFS logical unit (LU). Typically occurs when custom sequence generator is out of sync or `Client_SYS.Add_To_Attr` passes duplicate key attributes during `New___` or `Insert___`.',
    remediationSteps: [
      'Identify constraint name from stack trace.',
      'Verify sequence value generator for key column (e.g. `MY_SEQ.NEXTVAL`).',
      'Check if `Check_Insert___` is validating uniqueness before `Insert___`.'
    ]
  },
  'ORA-01403': {
    errorCode: 'ORA-01403',
    title: 'No Data Found',
    standardCause: 'A SELECT INTO statement returned zero rows.',
    ifsSpecificCause: 'In IFS PL/SQL, a direct `SELECT ... INTO ... FROM ... WHERE ...` was executed without handling `NO_DATA_FOUND` or using `Exist_Db` check first.',
    remediationSteps: [
      'Replace implicit `SELECT INTO` with explicit CURSOR and `FETCH...INTO`.',
      'Or wrap `SELECT INTO` in an exception block: `EXCEPTION WHEN no_data_found THEN ...;`',
      'Use standard IFS LU method `<LU_API>.Exist()` or `<LU_API>.Get_<Column>()` which handles missing rows safely.'
    ]
  },
  'ORA-06512': {
    errorCode: 'ORA-06512',
    title: 'PL/SQL Execution Error Line Indicator',
    standardCause: 'Indicates the backtrace line location where an unhandled exception propagated.',
    ifsSpecificCause: 'In IFS Cloud, ORA-06512 usually accompanies an `Error_SYS.Record_General` call or runtime PL/SQL crash within `Unpack___`, `Check_Common___`, `Insert___`, `Update___`, or Projection action handler.',
    remediationSteps: [
      'Examine lines prior to ORA-06512 in the log to find the root ORA- or IFS- error code.',
      'Locate the procedure line in *.apy or *.plsql.',
      'Inspect input attributes formatted with `Client_SYS` field separators (`Client_SYS.record_separator_`).'
    ]
  },
  'ORA-02291': {
    errorCode: 'ORA-02291',
    title: 'Integrity Constraint Violated - Parent Key Not Found',
    standardCause: 'A foreign key constraint failed because the specified parent record does not exist.',
    ifsSpecificCause: 'In Marble model (`.entity`), an association was defined without validating parent existence, or PL/SQL insert targeted a child entity before creating parent LU record.',
    remediationSteps: [
      'Verify foreign key reference in `.entity` association block.',
      'Ensure parent entity `Exist()` check runs in `Check_Common___` before persisting.'
    ]
  },
  'ORA-02292': {
    errorCode: 'ORA-02292',
    title: 'Integrity Constraint Violated - Child Record Found',
    standardCause: 'Cannot delete parent record because child table records reference it.',
    ifsSpecificCause: 'IFS LU delete method `Check_Delete___` or `Delete___` attempted to delete record with active references. Missing `cascade` option on Marble association.',
    remediationSteps: [
      'Check Marble `.entity` association definition for `@Cascade` or `on delete cascade`.',
      'Implement `Reference_SYS.Check_Restricted_Delete` check in PL/SQL.'
    ]
  },
  'IFS-ERR-GENERAL': {
    errorCode: 'IFS-ERR-GENERAL',
    title: 'IFS Error_SYS.Record_General Exception',
    standardCause: 'Business logic validation failure raised by IFS Framework.',
    ifsSpecificCause: 'Triggered when business rule conditions fail inside IFS PL/SQL code via `Error_SYS.Record_General(lu_name_, \'ERRNAME: Error message\')`.',
    remediationSteps: [
      'Review message key and custom text passed to `Error_SYS.Record_General`.',
      'Check input field validations inside `Check_Insert___`, `Check_Update___`, or Projection CRUD action.'
    ]
  }
};

export function getOracleErrorDetails(errorCode: string): OracleErrorDetail | undefined {
  const cleanCode = errorCode.trim().toUpperCase();
  return ORACLE_ERROR_KNOWLEDGE_BASE[cleanCode];
}

export function searchOracleErrors(query: string): OracleErrorDetail[] {
  const q = query.toLowerCase();
  return Object.values(ORACLE_ERROR_KNOWLEDGE_BASE).filter(err =>
    err.errorCode.toLowerCase().includes(q) ||
    err.title.toLowerCase().includes(q) ||
    err.ifsSpecificCause.toLowerCase().includes(q) ||
    err.remediationSteps.some(step => step.toLowerCase().includes(q))
  );
}
