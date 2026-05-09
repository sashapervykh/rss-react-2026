export function getErrorMessage(data: unknown) {
  if (!data || typeof data !== 'object') {
    throw new Error('Object should be recevied from API!');
  }
  if (
    !('status_message' in data) ||
    typeof data['status_message'] !== 'string'
  ) {
    return 'Unknown server error';
  }
  const message = data['status_message'];
  return message;
}
