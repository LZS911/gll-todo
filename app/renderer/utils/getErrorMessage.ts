interface SqlError {
  sqlMessage: string;
  sql: string;
}
export type GetErrorMessageParams = Error | string | SqlError;

export default function getErrorMessage(error: GetErrorMessageParams): string {
  if (!error) {
    return '未知错误!';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error || 'code' in error) {
    return error.message;
  }

  if (error.sqlMessage && error.sql) {
    return `${error.sql}: ${error.sqlMessage}`;
  }
  return '未知错误!';
}
